import { Component, OnInit } from '@angular/core';
import {Post} from "../../../core/model/post/post";
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage/token-storage.service";
import {PostService} from "../../../services/post/post.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  url: any;
  news: Post = new Post();
  content: any;
  roles: any;
  constructor(private route: ActivatedRoute, private newsService: PostService,
              private sanitizer: DomSanitizer, private tokenStorageService: TokenStorageService) { }

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
    this.newsService.getNewsByUrl(this.url).subscribe(data => {
      this.news = data;
      document.title = this.news.title;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.news.content);
    })
  }

}
