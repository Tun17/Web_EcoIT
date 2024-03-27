import { Component, OnInit } from '@angular/core';
import {Blog} from "../../../core/model/blog/blog";
import {BlogService} from "../../../services/blog/blog.service";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs: Blog[] = [];

  firstItem = {
    url: '',
    title: '',
    image: '',
    description: ''
  }

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.getBlogs();
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  }

  getBlogs(){
    this.blogService.getBlogList().subscribe(data => {
      this.blogs = data;
      this.firstItem.url = this.blogs[0].link;
      this.firstItem.title = this.blogs[0].title;
      this.firstItem.image = this.blogs[0].thumb.pathUrl;
      this.firstItem.description = this.blogs[0].description;
    })

    // @ts-ignore
    document.getElementById("header").classList.add("bg-dark");
    document.title = "Blog - Công ty cổ phần EcoIT";
  }

}
