import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Navigator} from "../../../core/model/navigator/navigator";
import {NavigationService} from "../../../services/navigation/navigation.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-nav-add',
  templateUrl: './nav-add.component.html',
  styleUrls: ['./nav-add.component.css']
})
export class NavAddComponent implements OnInit {

  id: any;
  group: any;
  isChild = false;
  nav: Navigator = new Navigator();
  navGroup: Navigator[] = [];

  constructor(private navService: NavigationService,
              private route: ActivatedRoute,
              private modalService: NgbActiveModal) { }

  ngOnInit(): void {
    this.id = window.sessionStorage.getItem("navId");
    if(this.id){
      this.getNavById(this.id);
    }else{
      this.group = window.sessionStorage.getItem("navGroup");

      if (this.group != null){
        this.isChild = true;
        this.navService.getById(this.group).subscribe(data => {
          this.nav.parentId = data.id;
        });
      }else{
        this.isChild = false;
      }
    }
    this.getAllNavGroup();

  }

  getNavById(id: any) {
    this.navService.getById(id).subscribe(data => {
      this.nav = data;
    });
  }

  getAllNavGroup(){
    this.navService.getNavGroup().subscribe(data => {
      this.navGroup = data;
    })
  }

  addNavigation(){
    this.navService.addNewNav(this.nav).subscribe(data =>{
      this.modalService.close(true)
    })
  }

  onSubmit(){
    if(this.id){
      this.navService.updateNav(this.id, this.nav).subscribe(data =>{
        this.modalService.close(true)
      })
    }else{
      this.addNavigation();
    }
  }

  closeModal(){
    window.sessionStorage.removeItem("navGroup");
    window.sessionStorage.removeItem("navId");
    this.modalService.dismiss();
  }

}
