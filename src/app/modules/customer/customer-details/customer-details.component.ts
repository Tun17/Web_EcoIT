import { Component, OnInit } from '@angular/core';
import {Customer} from "../../../core/model/customer/customer";
import {CustomerService} from "../../../services/customer/customer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer: Customer = new Customer();
  url: any;
  cover: any;

  constructor(private customerService: CustomerService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.url = this.route.snapshot.params['url'];
    if(this.url){
      this.customerService.getCusByUrl(this.url).subscribe(data => {
        this.customer = data;
        this.cover = this.customer.thumb.pathUrl;
        document.title = "KHỐI " + this.customer.name.toUpperCase();
      })

      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
      // @ts-ignore
      document.getElementById("header").classList.add("bg-dark");
    }else{
      this.router.navigate(['/404']);
    }
  }

}
