import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any;
  constructor(private proService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.listAll();
  }

  private listAll(){
    this.proService.getProductList().subscribe(data => {
      this.products = data;
    })
  }

  productDetail(){
    return this.router.navigate(['views'])
  }

  updateProduct(id: number){
    return this.router.navigate(['edit-product', id]);
  }

  deleteProduct(id: number){
    this.proService.deleteProduct(id).subscribe(data =>{
      this.listAll();
    })
  }

}
