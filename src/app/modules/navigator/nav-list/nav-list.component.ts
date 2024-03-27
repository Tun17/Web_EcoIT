import { Component, OnInit } from '@angular/core';
import {Navigator} from "../../../core/model/navigator/navigator";
import {About} from "../../../core/model/about/about";
import {AboutService} from "../../../services/about/about.service";
import {NavigationService} from "../../../services/navigation/navigation.service";

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.css']
})
export class NavListComponent implements OnInit {

  username: any;

  navParent: Navigator[] = [];

  about: About = new About();

  constructor(private navService: NavigationService,
              private aboutService: AboutService) { }

  ngOnInit(): void {
    this.getAllNav();
    this.getAbout();
  }

  getAllNav(){
    this.navService.getNavList().subscribe(data => {
      this.navParent = data;
    });
  }

  getAbout(){
    this.aboutService.getInfo().subscribe(data =>{
      if (data != null){
        this.about = data;
      }
    })
  }
}
