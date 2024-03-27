import { Component, OnInit } from '@angular/core';
import {About} from "../../../core/model/about/about";
import {AboutService} from "../../../services/about/about.service";
import {AddressService} from "../../../services/address/address.service";
import {Address} from "../../../core/model/address/address";

@Component({
  selector: 'app-contact-from',
  templateUrl: './contact-from.component.html',
  styleUrls: ['./contact-from.component.css']
})
export class ContactFromComponent implements OnInit {

  about: About = new About();
  address: Address = new Address();
  fullAddress: any;

  constructor(private aboutService: AboutService, private addressService: AddressService) { }

  ngOnInit(): void {
    this.aboutService.getInfo().subscribe(data =>{
      if (data != null){
        this.about = data;
        this.getListAddress(this.about)
      }
    })
  }

  getListAddress(about: About) {
    about.address.find((item: any) => {
      if (item.prefix.includes("Trụ sở chính")) {
        this.address = item;
        if (this.address.address != null) {
          this.fullAddress = this.address.address;
        }
        if (this.address.wards != null) {
          this.fullAddress = this.fullAddress + ", " + this.address.wards;
        }
        if (this.address.district != null) {
          this.addressService.getDistrictsByCode(this.address.district).subscribe(district => {
            this.fullAddress = this.fullAddress + ", " + district.name.replace("Quận", "Q.");
          })
        }
        if (this.address.province != null) {
          this.addressService.getProvincesByCode(this.address.province).subscribe(province => {
            this.fullAddress = this.fullAddress + ", " + province.name.replace("Thành phố", "TP.");
          })
        }
      }
    })
  }

  //   for (let i = 0; i < about.address.length; i++) {
  //     if (about.address[i].address != null) {
  //       this.fullAddress[i] = about.address[i].address;
  //     }
  //     if (about.address[i].wards != null) {
  //       this.fullAddress[i] = this.fullAddress[i] + ", " + about.address[i].wards;
  //     }
  //     if (about.address[i].district != null) {
  //       this.addressService.getDistrictsByCode(about.address[i].district).subscribe(district => {
  //         this.fullAddress[i] = this.fullAddress[i] + ", " + district.name;
  //       })
  //     }
  //     if (about.address[i].province != null) {
  //       this.addressService.getProvincesByCode(about.address[i].province).subscribe(province => {
  //         this.fullAddress[i] = this.fullAddress[i] + ", " + province.name;
  //       })
  //     }
  //   }
  // }

}
