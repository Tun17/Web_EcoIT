import { Component, OnInit } from '@angular/core';
import {AddressService} from "../../../services/address/address.service";
import {Address} from "../../../core/model/address/address";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-about-address',
  templateUrl: './about-address.component.html',
  styleUrls: ['./about-address.component.css']
})
export class AboutAddressComponent implements OnInit {

  address: Address = new Address();
  provinces: any;
  districts: any;
  wards: any;
  submitFail = false;
  errorMessage = "";

  constructor(private addressService: AddressService, private modalService: NgbActiveModal) { }

  ngOnInit(): void {
    this.addressService.getProvinces().subscribe(data =>{
      this.provinces = data;
    })

    this.defaultAddrCode();
  }

  defaultAddrCode(){
    this.address.province = null;
    this.address.district = null;
    this.address.wards = null;
  }

  getDistricts(codeProvince: any){
    this.addressService.getDistricts().subscribe(data =>{
      this.districts = data.filter((item: any) => item.province_code == codeProvince.target.value);
    })
  }

  getWards(codeDist: any){
    this.addressService.getWards().subscribe(data =>{
      this.wards = data.filter((item: any) => item.district_code == codeDist.target.value);
    })
  }

  save(){
    this.modalService.close(this.address);
  }

  closeModal(){
    this.modalService.close();
  }

}
