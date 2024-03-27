import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SliderControlComponent} from "../sliders/slider-control/slider-control.component";
import {SliderAddComponent} from "../sliders/slider-add/slider-add.component";

const routes: Routes = [
  {path: '', component: SliderControlComponent},
  {path: 'add-new', component: SliderAddComponent},
  {path: 'update/:id', component: SliderAddComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class SliderModule { }
