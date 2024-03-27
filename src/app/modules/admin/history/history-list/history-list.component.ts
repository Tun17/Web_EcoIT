import {Component, OnInit} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {HistoryService} from "../../../../services/history/history.service";
import {History} from "../history";
import {UserService} from "../../../../services/user/user.service";
import {User} from "../../../../core/model/user/user";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {

  histories: History[] = [];
  user: User[] = [];
  isFilter = false;

  totalPages: any;
  pageSizes = [10, 20, 30];

  searchField = {
    pageIndex: 1,
    pageSize: 10,
    sortField: '',
    sortDir: '',
    totalElements: 0,
    method: '',
    executor: '',
    action: '',
    page: ''
  }

  constructor(private historyService: HistoryService, private userService: UserService) { }

  ngOnInit(): void {
    this.getBySearch();
    this.userService.getUserList().subscribe(data => {
      this.user = data;
    })
  }

  listAll(){
    this.historyService.getAllHistory().subscribe(data =>{
      this.histories = data;
    })
  }

  getBySearch(){
    const params = new HttpParams()
      .set('pageNo', this.searchField.pageIndex)
      .set('pageSize', this.searchField.pageSize)
      .set('sortField', this.searchField.sortField)
      .set('sortDir', this.searchField.sortDir)
    this.historyService.getSearchList(params).subscribe(data => {
      this.histories = data.content;
      this.searchField.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
    });
  }

  getByFilter(){
    const filter = new HttpParams()
      .set('pageNo', this.searchField.pageIndex)
      .set('pageSize', this.searchField.pageSize)
      .set('sortField', this.searchField.sortField)
      .set('sortDir', this.searchField.sortDir)
      .set('method', this.searchField.method)
      .set('executor', this.searchField.executor)
      .set('action', this.searchField.action)
      .set('page', this.searchField.page)
    this.historyService.getFilterList(filter).subscribe(data => {
      this.histories = data.content;
      this.searchField.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.isFilter = true;
    });
  }

  clearFilter(){
    this.isFilter = false;
    this.searchField.executor = '';
    this.searchField.action = '';
    this.searchField.method = '';
    this.searchField.page = '';
    this.getBySearch();
  }

  search(){
    this.searchField.pageIndex = 1;
    this.getBySearch();
  }

  searchDirection(e: any){
    this.searchField.sortDir = e;
    this.getBySearch();
  }

  pageChanged(event: any){
    this.searchField.pageIndex = event;
    this.getBySearch();
  }

  changePageSize(psize: any) {
    this.searchField.pageSize = psize.target.value;
    this.searchField.pageIndex = 1;
    this.getBySearch();
  }

}
