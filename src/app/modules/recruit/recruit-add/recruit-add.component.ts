import { Component, OnInit } from '@angular/core';
import {Recruit} from "../../../core/model/recruit/recruit";
import {RecruitService} from "../../../services/recruit/recruit.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recruit-add',
  templateUrl: './recruit-add.component.html',
  styleUrls: ['./recruit-add.component.css']
})
export class RecruitAddComponent implements OnInit {

  id: any;
  recruit: Recruit = new Recruit();
  url: any;
  isUpdate= false;
  fileToUpload:string [] = [];

  ckeConfig: any;

  constructor(private recruitService: RecruitService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.isUpdate = true;
      this.getRecruitById(this.id);
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

  getRecruitById(id: any) {
    this.recruitService.getById(id).subscribe(data => {
      this.recruit = data;
      this.url = this.recruit.thumb.pathUrl;
    });
  }

  createRecruit(){
    const productFormData = this.prepareFormData(this.recruit);
    this.recruitService.addRecruit(productFormData).subscribe(data =>{
      this.goToRecruitList();
    });
  }

  updateRecruit(id: any){
    const productFormData = this.prepareFormData(this.recruit);
    this.recruitService.updateRecruit(id, productFormData).subscribe(data =>{
      this.goToRecruitList();
    });
  }

  prepareFormData(recruit: Recruit): FormData {
    const  formData = new FormData();
    formData.append(
      'recruit',
      new Blob([JSON.stringify(recruit)], {type: 'application/json'})
    );
    for (let i = 0; i < this.fileToUpload.length; i++){
      formData.append(
        'thumb',
        this.fileToUpload[i]
        // this.fileToUpload[i].name
      )
    }

    return formData;
  }

  goToRecruitList(){
    this.router.navigate(['/admin/recruit']);
  }

  onSubmit(){
    if(this.id){
      this.updateRecruit(this.id);
    }else{
      this.createRecruit();
    }
  }


  onFileChange(event: any) {
    // this.fileToUpload.push(event.target.files[0]);

    const files = event.target.files;
    if (files.length === 0)
      return;

    const reader = new FileReader();
    this.fileToUpload = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
    console.log(this.fileToUpload);
  }

}
