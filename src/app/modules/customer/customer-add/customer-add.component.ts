import { Component, OnInit } from '@angular/core';
import {Customer} from "../../../core/model/customer/customer";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../../services/customer/customer.service";
import {Product} from "../../../core/model/product/product";
import {ProductService} from "../../../services/product/product.service";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  id: any;
  customer: Customer = new Customer();
  products: Product[] = [];

  submitFail = false;
  errorMessage = "";

  image: any;
  fileToUpload: string [] = [];

  constructor(private cusService: CustomerService, private productService: ProductService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    window.sessionStorage.removeItem("redirect");
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getCustomById(this.id);
    }else{
      this.getProducts();
    }
  }

  getCustomById(id: number) {
    this.cusService.getCusById(id).subscribe(data => {
      this.customer = data;
      this.image = this.customer.thumb.pathUrl;
      this.getProductUpdate(this.customer);
    });
  }

  getProductUpdate(customer: Customer){
    this.productService.getProductList().subscribe(data => {
      this.products = data;
      if(customer.products != null){
        const sid = customer.products.map(item => item.id);
        for (let i=0; i<sid.length; i++){
          this.products.find( e => {
            if(e.id === sid[i]) e.selected = true;
          })
        }
      }
    })
  }

  getProducts(){
    this.productService.getProductList().subscribe(data =>{
      this.products = data;
    })
  }

  prepareFormData(customer: Customer, products: Product[]): FormData {
    const  formData = new FormData();
    formData.append(
      'customer',
      new Blob([JSON.stringify(customer)], {type: 'application/json'})
    );
    formData.append(
      'products',
      new Blob([JSON.stringify(products)], {type: 'application/json'})
    )
    for (let j = 0; j < this.fileToUpload.length; j++){
      formData.append(
        'thumb',
        this.fileToUpload[j]
      )
    }

    return formData;
  }

  addCustomer(){
    let customerFormData = this.prepareFormData(this.customer, this.products.filter(item => item.selected));
    this.cusService.newCustomer(customerFormData).subscribe(data =>{
      this.submitFail = false;
      this.goToCustomerList();
    },err =>{
      this.submitFail = true;
      this.errorMessage = err.error.message;
    })
  }

  updateCustomer(id: number){
    let customerFormData = this.prepareFormData(this.customer, this.products.filter(item => item.selected));
    this.cusService.updateCustomer(id, customerFormData).subscribe(data =>{
      this.submitFail = false;
      this.goToCustomerList();
    })
  }

  goToCustomerList(){
    this.router.navigate(['/admin/customer']);
  }

  onSubmit(){
    if(this.id){
      this.updateCustomer(this.id);
    }else{
      this.addCustomer();
    }
  }

  onChange(event: any) {
    const files = event.target.files;
    if (files.length === 0) return;

    const reader = new FileReader();
    this.fileToUpload = files;

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.image = reader.result;
    }
  }

  onCheckChange(event: any, product: Product){
    product.selected = event.currentTarget.checked;
  }

  notNeedFile(){
    // @ts-ignore
    document.getElementById("file-in").value = null;
    this.image = null;
    // this.onChange(this.fileToUpload);
  }

  addMoreProduct(){
    window.sessionStorage.setItem("redirect", "/admin/customer/add-new-customer");
    this.router.navigate(['/admin/product/new']);
  }

}
