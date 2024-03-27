import { Component, OnInit } from '@angular/core';
import {Product} from "../../../core/model/product/product";
import {ProductService} from "../../../services/product/product.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  content: any;
  url: any;

  constructor(private productService: ProductService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getProductList();
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    // @ts-ignore
    document.getElementById("header").classList.add("bg-dark");
  }

  getProductList(){
    this.url = this.route.snapshot.params['url'];
    this.productService.getProductByUrl(this.url).subscribe(data =>{
      this.product = data;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.product.content);
    })
  }

}
