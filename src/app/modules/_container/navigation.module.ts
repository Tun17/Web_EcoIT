import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NavControlComponent} from "../navigator/nav-control/nav-control.component";

const routes: Routes = [
  {path: '', title: 'Admin - Điều hướng', component: NavControlComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NavigationModule { }
