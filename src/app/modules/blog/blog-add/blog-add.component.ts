import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Blog} from "../../../core/model/blog/blog";
import {BlogService} from "../../../services/blog/blog.service";

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {

  blog: Blog = new Blog();
  fileToUpload:string [] = [];
  url: any;
  id: any;
  ckeConfig: any;

  submitFail = false;
  errMessage = "";

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.blogService.getBlogById(this.id).subscribe(data =>{
        this.blog = data;
        this.url = this.blog.thumb.pathUrl;
      });
    }

    this.ckeConfig = {
      extraPlugins: 'uploadimage, justify, colorbutton, colordialog, iframe, font',
      uploadUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
      height: 330,
      filebrowserUploadUrl:'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
      filebrowserImageUploadUrl:'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images',
    };

  }

  publicBlog(){
    const blogFormData = this.prepareFormData(this.blog);
    this.blogService.writeBlog(blogFormData).subscribe(data => {
      this.submitFail = false;
      this.goToBlogList();
    },err => {
      this.submitFail = true;
      this.errMessage = err.error.message;
    });
  }

  addDataToForm(id: any){
    const formData = this.prepareFormData(this.blog);
    this.blogService.updateBlog(id, formData).subscribe(data =>{
      this.goToBlogList();
    });
  }

  prepareFormData(blog: Blog): FormData {
    const formData = new FormData();
    formData.append(
      'blog',
      new Blob([JSON.stringify(blog)], {type: 'application/json'})
    );
    for (let i = 0; i < this.fileToUpload.length; i++){
      formData.append(
        'thumb',
        this.fileToUpload[i]
      )
    }

    return formData;
  }

  goToBlogList(){
    this.router.navigate(['/admin/blog']);
  }

  onSubmit(){
    if(this.id){
      this.addDataToForm(this.id);
    }else{
      this.publicBlog();
    }
  }

  imageChange(e: any){
    const files = e.target.files;
    if (files.length === 0) return;

    const reader = new FileReader();
    this.fileToUpload = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

}
