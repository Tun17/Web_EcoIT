import { Component, OnInit } from '@angular/core';
import {TypicalCustomer} from "../typical-customer";
import {HttpParams} from "@angular/common/http";
import {CustomerService} from "../../../../services/customer/customer.service";

@Component({
  selector: 'app-cus-typical-control',
  templateUrl: './cus-typical-control.component.html',
  styleUrls: ['./cus-typical-control.component.css']
})
export class CusTypicalControlComponent implements OnInit {

  customers: TypicalCustomer[] = [];
  totalPages: any;
  pageSizes = [10, 20, 30];

  searchField = {
    pageIndex: 1,
    pageSize: 10,
    totalElements: 0
  }

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getTypicalCustomer();
  }

  getTypicalCustomer(){
    const params = new HttpParams()
      .set('pageNo', this.searchField.pageIndex)
      .set('pageSize', this.searchField.pageSize)
    this.customerService.getTypicalSearch(params).subscribe(data => {
      this.customers = data.content;
      this.searchField.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
    });
  }



  pageChanged(event: any){
    this.searchField.pageIndex = event;
    this.getTypicalCustomer();
  }

  changePageSize(event: any) {
    this.searchField.pageSize = event.target.value;
    this.searchField.pageIndex = 1;
    this.getTypicalCustomer();
  }

}
