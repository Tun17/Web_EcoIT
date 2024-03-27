import { Component, OnInit } from '@angular/core';
import {Sliders} from "../../../core/model/sliders/sliders";
import {SliderService} from "../../../services/slider/slider.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-slider-add',
  templateUrl: './slider-add.component.html',
  styleUrls: ['./slider-add.component.css']
})
export class SliderAddComponent implements OnInit {

  id: any;
  slider: Sliders = new Sliders();
  url: any;
  isUpdate= false;
  fileToUpload:string [] = [];
  action = "";

  constructor(private sliderService: SliderService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.isUpdate = true;
      this.getById(this.id);
      this.action = "Chỉnh sửa";
    }else{
      this.action = "Thêm mới";
    }
  }

  getById(id: any) {
    this.sliderService.getById(id).subscribe(data => {
      this.slider = data;
      this.url = this.slider.pathUrl;
    });
  }

  createNew(){
    const formData = new FormData();
    formData.append(
      'cover',
      this.fileToUpload[0]
    )
    this.sliderService.addNew(formData).subscribe(data =>{
      this.goToSliderList();
    });
  }

  updateSlider(id: any){
    const productFormData = this.prepareFormData(this.slider);
    this.sliderService.update(id, productFormData).subscribe(data =>{
      this.goToSliderList();
    });
  }

  prepareFormData(sliders: Sliders): FormData {
    const  formData = new FormData();
    formData.append(
      'sliders',
      new Blob([JSON.stringify(sliders)], {type: 'application/json'})
    );
    for (let i = 0; i < this.fileToUpload.length; i++){
      formData.append(
        'cover',
        this.fileToUpload[i]
        // this.fileToUpload[i].name
      )
    }
    // formData.append('thumb', this.fileToUpload, this.fileToUpload.name);

    return formData;
  }

  goToSliderList(){
    this.router.navigate(['/admin/sliders']);
  }

  onSubmit(){
    if(this.id){
      this.updateSlider(this.id);
    }else{
      this.createNew();
    }
  }


  onChange(event: any) {
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
