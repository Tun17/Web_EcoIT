import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../../services/about/about.service';
import { About } from '../../../core/model/about/about';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-about-home',
  templateUrl: './about-home.component.html',
  styleUrls: ['./about-home.component.css'],
})
export class AboutHomeComponent implements OnInit {
  paragraph: String[] = [];
  abouts: About = new About();
  link: any;
  desc: any;

  constructor(
    private aboutService: AboutService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.aboutService.getInfo().subscribe((data) => {
      this.abouts = data;
      if (this.abouts != null) {
        this.desc = this.sanitizer.bypassSecurityTrustHtml(
          this.abouts.description
        );
        this.link = this.sanitizer.bypassSecurityTrustHtml(
          this.abouts.videoLINK
        );
      } else {
        this.desc = `<p>[empty]</p>`;
      }
    });
  }
}
