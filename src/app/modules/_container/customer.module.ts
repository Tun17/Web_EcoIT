import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CustomerControlComponent} from "../customer/customer-control/customer-control.component";
import {CustomerAddComponent} from "../customer/customer-add/customer-add.component";
import {CusTypicalControlComponent} from "../typical/customer/cus-typical-control/cus-typical-control.component";
import {CusTypicalAddComponent} from "../typical/customer/cus-typical-add/cus-typical-add.component";

const routes: Routes = [
  {path: '', component: CustomerControlComponent},
  {path: 'add-new-customer', title: 'Admin - Khách hàng', component: CustomerAddComponent},
  {path: 'update-cus/:id', title: 'Admin - Khách hàng', component: CustomerAddComponent},

  {path: 'typical', title: 'Admin - Khách hàng tiêu biểu', component: CusTypicalControlComponent},
  {path: 'typical/new', component: CusTypicalAddComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CustomerModule { }
