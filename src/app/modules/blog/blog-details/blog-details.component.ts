import {Component, OnInit} from '@angular/core';
import {Blog} from "../../../core/model/blog/blog";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {BlogService} from "../../../services/blog/blog.service";

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  url: any;
  blogs: Blog = new Blog();
  content: any;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private blogSerive: BlogService) {
  }

  ngOnInit(): void {
    this.getList();

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    // @ts-ignore
    document.getElementById("header").classList.add("bg-dark");
  }

  getList(){
    this.url = this.route.snapshot.params['url'];
    this.blogSerive.getBlogByUrl(this.url).subscribe(data => {
      this.blogs = data;
      document.title = this.blogs.title;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.blogs.content);
    })
  }
}
