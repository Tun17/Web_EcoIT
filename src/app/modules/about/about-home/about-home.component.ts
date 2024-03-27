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
  desc: any =
    'Công ty Cổ phần EcoIT được đăng ký thành lập ngày 29/4/2010 là một Công ty tin học chuyên cung cấp phần mềm, dịch vụ, hệ thống và các giải pháp về Công nghệ thông tin được sáng lập và lãnh đạo bởi các chuyên gia quản lý, chuyên gia công nghệ có kinh nghiệm lâu năm trong lĩnh vực Công nghệ thông tin có cùng ý tưởng đến từ nhiều tổ chức, doanh nghiệp trong các lĩnh vực khác nhau.';

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
