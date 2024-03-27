import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage/token-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  today: any;
  day:any;
  month: any;
  year: any;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.calendarHome();
  }

  calendarHome(){
    const weekday = ["Chủ nhật","Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"];

    const d = new Date();
    this.today = weekday[d.getDay()];
    this.day = d.getDate();
    this.month = d.getMonth()+1;
    this.year = d.getFullYear();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
