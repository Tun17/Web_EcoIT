import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TypicalCustomer} from "../typical-customer";
import {CustomerService} from "../../../../services/customer/customer.service";

@Component({
  selector: 'app-cus-typical-add',
  templateUrl: './cus-typical-add.component.html',
  styleUrls: ['./cus-typical-add.component.css']
})
export class CusTypicalAddComponent implements OnInit {

  id: any;
  url: any;
  fileToUpload: any;

  typicalCustomer: TypicalCustomer = new TypicalCustomer();

  constructor(private route: ActivatedRoute, private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  goToTypicalList(){
    this.router.navigate(['admin/customer/typical']);
  }

  prepareFormData(customer: TypicalCustomer): FormData {
    const formData = new FormData();
    formData.append(
      'customer',
      new Blob([JSON.stringify(customer)], {type: 'application/json'})
    );

    formData.append(
      'image',
      this.fileToUpload
    )

    return formData;
  }

  onSubmit(){
    const galleryForm = this.prepareFormData(this.typicalCustomer)
    this.customerService.newTypical(galleryForm).subscribe( () => this.goToTypicalList())
  }

  onChange(event: any) {
    const files = event.target.files;
    if (files.length === 0)
      return;

    const reader = new FileReader();
    this.fileToUpload = files[0];

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  notNeedFile(){
    // @ts-ignore
    document.getElementById("file-in").value = null;
    this.url = null;
    this.fileToUpload = null;
  }

}
