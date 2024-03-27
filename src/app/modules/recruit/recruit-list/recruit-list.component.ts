import { Component, OnInit } from '@angular/core';
import {Recruit} from "../../../core/model/recruit/recruit";
import {RecruitService} from "../../../services/recruit/recruit.service";

@Component({
  selector: 'app-recruit-list',
  templateUrl: './recruit-list.component.html',
  styleUrls: ['./recruit-list.component.css']
})
export class RecruitListComponent implements OnInit {

  recruit: Recruit[] = [];

  constructor(private recruitService: RecruitService) { }

  ngOnInit(): void {
    // @ts-ignore
    document.getElementById("header").classList.add("bg-dark");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    this.getRecruitList();
  }

  getRecruitList(){
    this.recruitService.getRecruitList().subscribe(data =>{
      this.recruit = data;
    })
  }

}
