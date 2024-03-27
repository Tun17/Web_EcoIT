import { Component, OnInit } from '@angular/core';
import { Sliders } from '../../../core/model/sliders/sliders';
import { SliderService } from '../../../services/slider/slider.service';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html',
  styleUrls: ['./slider-list.component.css'],
})
export class SliderListComponent implements OnInit {
  sliders: Sliders[] = [];
  url: any;

  constructor(private sliderService: SliderService) {}

  ngOnInit(): void {
    this.sliderService.getListAll().subscribe((data) => {
      this.sliders = data;
      this.url = this.sliders[0].pathUrl;
    });
  }
}
