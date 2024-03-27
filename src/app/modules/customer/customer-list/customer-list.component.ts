import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  // customer: any = [
  //   {
  //     icon: 'fa fa-university',
  //     name: 'KHÁCH HÀNG CHÍNH PHỦ',
  //     description: 'Bao gồm các Bộ, Ban, Ngành và các cơ quan nhà nước khác',
  //     url: '../../',
  //   },
  //   {
  //     icon: 'fa fa-slideshare',
  //     name: 'KHÁCH HÀNG DOANH NGHIỆP',
  //     description: 'Bao gồm các tập đoàn, doanh nghiệp lớn trong và ngoài nước',
  //     url: '../../',
  //   },
  //   {
  //     icon: 'fa fa-dollar',
  //     name: 'KHÁCH HÀNG TÀI CHÍNH NGÂN HÀNG',
  //     description: 'Bao gồm các ngân hàng, công ty tài chính',
  //     url: '../../',
  //   },
  //   {
  //     icon: 'fa fa-shield',
  //     name: 'KHÁCH HÀNG AN NINH - QUỐC PHÒNG',
  //     description:
  //       'Bao gồm các cơ quan, đơn vị thuộc Bộ Công An và Bộ Quốc Phòng',
  //     url: '../../',
  //   },
  // ];
  customer: any;

  constructor(private cusService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  private getCustomer() {
    this.cusService.getCustomerList().subscribe((data) => {
      this.customer = data;
    });
  }
}
