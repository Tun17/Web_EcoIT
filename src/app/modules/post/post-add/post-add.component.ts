import { Component, OnInit } from '@angular/core';
import {Post} from "../../../core/model/post/post";
import {PostService} from "../../../services/post/post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {

  news: Post = new Post();
  fileToUpload:string [] = [];
  url: any;
  id: any;
  ckeConfig: any;


  constructor(private newsService: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.newsService.getNewsById(this.id).subscribe(data =>{
        this.news = data;
        this.url = this.news.postImage.pathUrl;
      });
    }

    this.ckeConfig = {
      extraPlugins: 'uploadimage, justify, colorbutton, colordialog, iframe, font',
      uploadUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
      height: 330,
      // Configure your file manager integration. This example uses CKFinder 3 for PHP.
      // filebrowserBrowseUrl:'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
      // filebrowserImageBrowseUrl:'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      filebrowserUploadUrl:'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
      filebrowserImageUploadUrl:'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images',

    };

  }

  saveNews(){
    const newsFormData = this.prepareFormData(this.news);
    this.newsService.createNews(newsFormData).subscribe(data =>{
        this.goToNewsList();
      },
      error => console.log(error));
  }

  addDataToForm(id: any){
    const newsFormData = this.prepareFormData(this.news);
    this.newsService.updateNews(id, newsFormData).subscribe(data =>{
      this.goToNewsList();
    });
  }

  prepareFormData(news: Post): FormData {
    const formData = new FormData();
    formData.append(
      'news',
      new Blob([JSON.stringify(news)], {type: 'application/json'})
    );
    // formData.append('imageFile', this.fileToUpload, this.fileToUpload.name);
    for (let i = 0; i < this.fileToUpload.length; i++){
      formData.append(
        'imageFile',
        this.fileToUpload[i]
        // this.fileToUpload[i].name
      )
    }

    return formData;
  }

  goToNewsList(){
    this.router.navigate(['/admin/post']);
  }

  onSubmit(){
    if(this.id){
      this.addDataToForm(this.id);
    }else{
      this.saveNews();
    }
  }

  thumbnailChange(e: any){
    const files = e.target.files;
    if (files.length === 0) return;

    const reader = new FileReader();
    this.fileToUpload = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  onFileChange(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.fileToUpload.push(event.target.files[i]);
    }

    const files = event.target.files;
    if (files.length === 0)
      return;


    const reader = new FileReader();
    // this.fileToUpload = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

}
