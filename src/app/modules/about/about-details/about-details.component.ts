import { Component, OnInit } from '@angular/core';
import {About} from "../../../core/model/about/about";
import {AboutService} from "../../../services/about/about.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-about-details',
  templateUrl: './about-details.component.html',
  styleUrls: ['./about-details.component.css']
})
export class AboutDetailsComponent implements OnInit {

  about: About = new About();
  content: any;

  constructor(private aboutService: AboutService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.aboutService.getInfo().subscribe(data =>{
      this.about = data
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.about.content);
    })

    // @ts-ignore
    document.getElementById("header").classList.add("bg-dark");
  }

}
