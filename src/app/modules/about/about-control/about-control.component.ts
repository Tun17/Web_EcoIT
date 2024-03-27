import { Component, OnInit } from '@angular/core';
import {About} from "../../../core/model/about/about";
import {AboutService} from "../../../services/about/about.service";
import {AddressService} from "../../../services/address/address.service";
import {Address} from "../../../core/model/address/address";
import {AboutAddressComponent} from "../about-address/about-address.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";

@Component({
  selector: 'app-about-control',
  templateUrl: './about-control.component.html',
  styleUrls: ['./about-control.component.css']
})
export class AboutControlComponent implements OnInit {

  about: About = new About();
  address: Address[] = [];

  wards: any;
  fullAddress: String[] =[];
  draftAddr: String[] =[];

  ckeConfig: any;
  updateSuccess = false;
  errorMessage = "";

  constructor(private aboutService: AboutService, private addressService: AddressService,
              private modalService: NgbModal) { }

  ngOnInit(): void {

    this.goToInfo();

    this.ckeConfig = {
      extraPlugins: 'uploadimage, justify, colorbutton, colordialog, iframe, font',
      uploadUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
      height: 330,
      filebrowserUploadUrl:'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
      filebrowserImageUploadUrl:'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images',

    };
  }

  goToInfo(){
    this.aboutService.getInfo().subscribe(data =>{
      if(data != null){
        this.about = data;
        this.getListAddress(this.about.address)
      }
    })

  }

  getListAddress(address: Address[]){
    for (let i=0; i<address.length; i++){
      if(address[i].prefix != null){
        this.fullAddress[i] = address[i].prefix + ": ";
      }if(address[i].address != null){
        this.fullAddress[i] = this.fullAddress[i] + address[i].address;
      }
      if (address[i].wards != null){
        this.fullAddress[i] = this.fullAddress[i] + ", " + address[i].wards;
      }
      if (address[i].district != null){
        this.addressService.getDistrictsByCode(address[i].district).subscribe(district => {
          this.fullAddress[i] = this.fullAddress[i] + ", " + district.name;
        })
      }
      if (address[i].province != null){
        this.addressService.getProvincesByCode(address[i].province).subscribe( province =>{
          this.fullAddress[i] = this.fullAddress[i] + ", " + province.name;
        })
      }
    }
  }

  onSubmit(){
    const about = this.prepareFormData(this.about, this.address);
    this.aboutService.saveInfo(about).subscribe(() =>{
      this.updateSuccess = true;
      this.errorMessage = "Cập nhật thành công !";
      this.address = [];
      this.goToInfo();
    }, err => {
      this.errorMessage = err.error.message;
      this.updateSuccess = false;
    })
  }

  prepareFormData(about: About, address: Address[]): FormData {
    const  formData = new FormData();
    formData.append(
      'about',
      new Blob([JSON.stringify(about)], {type: 'application/json'})
    );

    formData.append(
      'address',
      new Blob([JSON.stringify(address)], {type: 'application/json'})
    )

    return formData;
  }

  removeAddress(id: number){
    this.aboutService.unlinkAdd(id).subscribe(() => this.goToInfo());
  }

  // add address modal ----------------------------------------------------------------------
  draftAddress(address: Address[]){
    for (let i=0; i<address.length; i++){
      if(address[i].prefix != null){
        this.draftAddr[i] = address[i].prefix + ": ";
      }if(address[i].address != null){
        this.draftAddr[i] = this.draftAddr[i] + address[i].address;
      }
      if (address[i].wards != null){
        this.draftAddr[i] = this.draftAddr[i] + ", " + address[i].wards;
      }
      if (address[i].district != null){
        this.addressService.getDistrictsByCode(address[i].district).subscribe(district => {
          this.draftAddr[i] = this.draftAddr[i] + ", " + district.name;
        })
      }
      if (address[i].province != null){
        this.addressService.getProvincesByCode(address[i].province).subscribe( province =>{
          this.draftAddr[i] = this.draftAddr[i] + ", " + province.name;
        })
      }
    }
  }
  modalRef?: NgbModalRef;

  openModal(){
    this.modalRef = this.modalService.open(AboutAddressComponent, {
      size: "lg",
      centered: false,
      backdrop: false,
      animation: true,
    });
    this.modalRef.result.then(data => {
      if (data){
        this.address.push(data);
        this.draftAddress(this.address);
      }
    })
  }
}
