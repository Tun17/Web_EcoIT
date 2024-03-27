import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PostAddComponent} from "../post/post-add/post-add.component";
import {PostControlComponent} from "../post/post-control/post-control.component";

const routes: Routes = [
  {path: '', component: PostControlComponent},
  {path: 'new', component: PostAddComponent},
  {path: 'update/:id', component: PostAddComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PostModule { }
