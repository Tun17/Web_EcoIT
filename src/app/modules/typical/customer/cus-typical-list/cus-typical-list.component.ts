import { Component, OnInit } from '@angular/core';
import {TypicalCustomer} from "../typical-customer";
import {CustomerService} from "../../../../services/customer/customer.service";

@Component({
  selector: 'app-cus-typical-list',
  templateUrl: './cus-typical-list.component.html',
  styleUrls: ['./cus-typical-list.component.css']
})
export class CusTypicalListComponent implements OnInit {

  customers: TypicalCustomer[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getTypicalList().subscribe(data => {
      this.customers = data;
    })

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    // @ts-ignore
    document.getElementById("header").classList.add("bg-dark");
  }

}
