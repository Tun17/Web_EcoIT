import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BannerService} from "../../../services/banner/banner.service";
import {Banner} from "../../../core/model/banner/banner";

@Component({
  selector: 'app-banner-add',
  templateUrl: './banner-add.component.html',
  styleUrls: ['./banner-add.component.css']
})
export class BannerAddComponent implements OnInit {

  url: any;
  fileToUpload: any;
  banner: Banner = new Banner();

  constructor(private bannerService: BannerService, private modalService: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const formData = this.prepareFormData(this.banner);
    this.bannerService.addBanner(formData).subscribe(() =>{
      this.modalService.close(true);
    })
  }

  prepareFormData(banner: Banner): FormData {
    const formData = new FormData();
    formData.append(
      'target',
      banner.target
    );
    formData.append(
      'banner',
      this.fileToUpload
    )

    return formData;
  }

  notNeedFile(){
    // @ts-ignore
    document.getElementById("file-in").value = null;
    this.url = null;
    this.fileToUpload = null;
  }

  inputFile(event: any) {
    const files = event.target.files;
    if (files.length === 0)
      return;

    const reader = new FileReader();
    this.fileToUpload = files[0];

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  closeModal(){
    this.modalService.close();
  }

}
