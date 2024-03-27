import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage/token-storage.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  role: any;
  username: any;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.username = user.username;
    this.role = user.roles;
  }
}
