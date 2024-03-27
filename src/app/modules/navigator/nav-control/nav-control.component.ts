import {Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {Navigator} from "../../../core/model/navigator/navigator";
import {Router} from "@angular/router";
import {NavigationService} from "../../../services/navigation/navigation.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";
import {NavAddComponent} from "../nav-add/nav-add.component";
import {ToastService} from "../../toast/toast.service";
import {ToastContainerComponent} from "../../toast/toast-container/toast-container.component";

@Component({
  selector: 'app-nav-control',
  templateUrl: './nav-control.component.html',
  styleUrls: ['./nav-control.component.css']
})
export class NavControlComponent implements OnInit {

  id: any;
  nav: Navigator = new Navigator();
  navList: Navigator[] = [];
  selectNavList: Navigator[] = [];
  removeSelectNav: Navigator[] = [];
  selects: any;
  totalPages: any;
  pageSizes = [20, 30, 40];

  searchField = {
    pageIndex: 1,
    pageSize: 20,
    totalElements: 0,
    keyword: ''
  }

  actionT = false;
  actionId: any;

  constructor(private navService: NavigationService, private router: Router, private renderer: Renderer2,
              private modalService: NgbModal, private toast: ToastService) {

    this.renderer.listen('window', 'click',(e:Event)=>{

      // @ts-ignore
      if (e.target.id !== this.actionId) {
        this.actionT = false;
        // @ts-ignore
        document.getElementById(`${this.actionId}`).classList.toggle('target');
      }
    });
  }

  ngOnInit(): void {
    window.sessionStorage.removeItem("navGroup");
    window.sessionStorage.removeItem("navId");
    this.getAllNav();
  }

  getAllNavGroup(){
    this.navService.getNavList().subscribe(data => {
      this.navList = data;
    })
  }

  getAllNav(){
    this.navService.getNavList().subscribe(data => {
      this.navList = data;
    });
  }

  getSearchNav(){
    const params = new HttpParams()
      .set('pageNo', this.searchField.pageIndex)
      .set('pageSize', this.searchField.pageSize)
      .set('keyword', this.searchField.keyword);
    this.navService.searchNavList(params).subscribe(data => {
      this.navList = data.content;
      this.searchField.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
    });
  }

  search(){
    this.searchField.pageIndex = 1;
    this.getSearchNav();
  }

  pageChanged(event: any){
    this.searchField.pageIndex = event;
    this.getSearchNav();
  }

  changePageSize(event: any) {
    this.searchField.pageSize = event.target.value;
    this.searchField.pageIndex = 1;
    this.getSearchNav();
  }

  deleteControl(){
    if(this.navList.length-1 < 1 && this.searchField.pageIndex !== 1){
      this.searchField.pageIndex = this.searchField.pageIndex - 1;
    }
    this.getAllNav()
  }

  deleteNav(id: number){
    let option = confirm("Bạn có chắc chắn thực hiện điều này không?");

    if(option){
      this.navService.deleteNav(id).subscribe(data =>{
        // this.toast.show("Xóa thành công!", { classname: 'bg-success text-light', delay: 10000 })
        this.deleteControl();
      })
    }
  }

  // ==================================================================================
  actionTarget(event: any) {
    let target: any = event.target || event.srcElement || event.currentTarget;
    let idAttr = target.attributes.id;

    this.actionId = idAttr.nodeValue;
    this.actionT = true;

    let current = document.getElementsByClassName("target");

    if (current.length > 0) {
      current[0].className = current[0].className.replace(" target", "");
    }

    event.target.classList.toggle('target');

  }

  prepareFormData(ids: any): FormData {
    const  formData = new FormData();
    formData.append(
      'id',
      new Blob([JSON.stringify(ids)], {type: 'application/json'})
    )

    return formData;
  }

  onCheckChange(event: any, navigator: Navigator){
    this.selectNavList.push(navigator);
    navigator.selected = event.currentTarget.checked;
    this.selects = this.selectNavList.filter(item => item.selected).length;
  }

  clearAll(){
    this.removeSelectNav = this.selectNavList.filter(item => item.selected);
    const formDATA = this.prepareFormData(this.removeSelectNav.map(id => id.id));
    this.navService.deleteAllNav(formDATA).subscribe(() => {
      this.selects = null;
      this.selectNavList = [];
      this.getAllNav();
    })
  }

  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef> | undefined;
  uncheckAll() {
    // @ts-ignore
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.selects = null;
  }

  // ======== popup ===========================================================

  modalRef?: NgbModalRef;

  addNew(){
    this.modalRef = this.modalService.open(NavAddComponent, {
      size: "md",
      centered: false,
      backdrop: false,
      animation: true,
      backdropClass: "modal-backdrop"
    });
    this.modalRef.result.then(item => {
      if(item){
        this.getAllNavGroup();
      }
    })
  }

  addChild(e: any){
    this.modalRef = this.modalService.open(NavAddComponent, {
      size: "md",
      centered: false,
      backdrop: false,
      animation: true,
      backdropClass: "modal-backdrop"
    });
    this.modalRef.result.then(item => {
      if(item){
        this.getAllNavGroup();
      }
    })
    window.sessionStorage.setItem("navGroup", e.target.id)
  }

  updateModal(id: any){
    this.modalRef = this.modalService.open(NavAddComponent, {
      size: "md",
      centered: false,
      backdrop: false,
      animation: true,
      backdropClass: "modal-backdrop"
    });
    this.modalRef.result.then(item => {
      if(item){
        this.toast.show("Cập nhật thành công!", { classname: 'bg-success text-light', delay: 10000 })
        this.getAllNavGroup();
      }
    })
    window.sessionStorage.setItem("navId", id)
  }
}
