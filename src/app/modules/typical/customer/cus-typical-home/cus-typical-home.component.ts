import { Component, OnInit } from '@angular/core';
import {TypicalCustomer} from "../typical-customer";
import {CustomerService} from "../../../../services/customer/customer.service";

@Component({
  selector: 'app-cus-typical-home',
  templateUrl: './cus-typical-home.component.html',
  styleUrls: ['./cus-typical-home.component.css']
})
export class CusTypicalHomeComponent implements OnInit {

  customers: TypicalCustomer[] = [];
  slideConfig: any

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getTypicalList().subscribe(data => {
      this.customers = data;
    })

    this.slideConfig = {
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 6,
      slidesToScroll: 1,
      prevArrow: false,
      nextArrow: false
    };
  }

}
