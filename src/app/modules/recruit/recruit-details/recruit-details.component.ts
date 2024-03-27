import { Component, OnInit } from '@angular/core';
import {Recruit} from "../../../core/model/recruit/recruit";
import {RecruitService} from "../../../services/recruit/recruit.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-recruit-details',
  templateUrl: './recruit-details.component.html',
  styleUrls: ['./recruit-details.component.css']
})
export class RecruitDetailsComponent implements OnInit {

  recruit: Recruit = new Recruit();
  url: any
  content: any;

  constructor(private recruitService: RecruitService, private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let element = document.getElementById("header");
    // @ts-ignore
    element.classList.add("bg-dark");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    this.url = this.route.snapshot.params['url'];
    this.recruitService.getDetails(this.url).subscribe(data=>{
      this.recruit = data;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.recruit.content);
      document.title = this.recruit.title;
    })
  }

}
