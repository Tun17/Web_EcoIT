import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post/post.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  news: any;
  firstItem = {
    url: '',
    title: '',
    image: '',
    description: ''
  }
  url: any;

  totalPages: any;
  searchField = {
    pageIndex: 1,
    pageSize: 9,
    totalElements: 0
  }

  constructor(private newsService: PostService) { }

  ngOnInit(): void {
    this.getNews();
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  }

  private getNews(){
    const params = new HttpParams().set('pageNo', this.searchField.pageIndex)
    this.newsService.getNewsHome(params).subscribe(data => {
      this.news = data.content;
      this.searchField.totalElements = data.totalElements;
      this.totalPages = data.totalPages;

      this.firstItem.url = this.news[0].url;
      this.firstItem.title = this.news[0].title;
      this.firstItem.image = this.news[0].postImage.pathUrl;
      this.firstItem.description = this.news[0].description;
    });

    // @ts-ignore
    document.getElementById("header").classList.add("bg-dark");
    document.title = "TIN MỚI NHẤT - Công ty cổ phần EcoIT";
  }

  pageChanged(event: any){
    this.searchField.pageIndex = event;
    this.getNews();
  }

}
