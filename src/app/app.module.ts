import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomerAddComponent } from './modules/customer/customer-add/customer-add.component';
import { CustomerListComponent } from './modules/customer/customer-list/customer-list.component';
import { HideMissingDirective } from './hide-missing.directive';
import { CustomerControlComponent } from './modules/customer/customer-control/customer-control.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./modules/home/home-page/home.component";
import { NgxPaginationModule } from 'ngx-pagination';
import {AsideComponent} from "./modules/admin/aside/aside.component";
import {HeaderComponent} from "./modules/admin/header/header.component";
import {DashBoardComponent} from "./modules/admin/dash-board/dash-board.component";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {PageNotFoundComponent} from "./authentication/404/page-not-found.component";
import { SliderControlComponent } from './modules/sliders/slider-control/slider-control.component';
import { SliderListComponent } from './modules/sliders/slider-list/slider-list.component';
import { SliderAddComponent } from './modules/sliders/slider-add/slider-add.component';
import { PostAddComponent } from './modules/post/post-add/post-add.component';
import { PostControlComponent } from './modules/post/post-control/post-control.component';
import { NavListComponent } from './modules/navigator/nav-list/nav-list.component';
import { ProductAddComponent } from './modules/product/product-add/product-add.component';
import { ProductListComponent } from './modules/product/product-list/product-list.component';
import { ProductControlComponent } from './modules/product/product-control/product-control.component';
import { RecruitPostComponent } from './modules/home/group/recruit-post/recruit-post.component';
import { AboutHomeComponent } from './modules/about/about-home/about-home.component';
import { AboutControlComponent } from './modules/about/about-control/about-control.component';
import { AboutDetailsComponent } from './modules/about/about-details/about-details.component';
import { PostListComponent } from './modules/post/post-list/post-list.component';
import { PostDetailsComponent } from './modules/post/post-details/post-details.component';
import { RecruitControlComponent } from './modules/recruit/recruit-control/recruit-control.component';
import { RecruitAddComponent } from './modules/recruit/recruit-add/recruit-add.component';
import { RecruitListComponent } from './modules/recruit/recruit-list/recruit-list.component';
import { RecruitDetailsComponent } from './modules/recruit/recruit-details/recruit-details.component';
import { NavAddComponent } from './modules/navigator/nav-add/nav-add.component';
import { FooterComponent } from './modules/home/footer/footer.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { AdminComponent } from './modules/admin/admin/admin.component';
import {NavControlComponent} from "./modules/navigator/nav-control/nav-control.component";
import { CustomerDetailsComponent } from './modules/customer/customer-details/customer-details.component';
import {ProductDetailsComponent} from "./modules/product/product-details/product-details.component";
import {NumberHomeComponent} from "./modules/typical/number/number-home/number-home.component";
import {GalleryControlComponent} from "./modules/typical/gallery/gallery-control/gallery-control.component";
import {GalleryHomeComponent} from "./modules/typical/gallery/gallery-home/gallery-home.component";
import { NumberControlComponent } from './modules/typical/number/number-control/number-control.component';
import { NumberAddComponent } from './modules/typical/number/number-add/number-add.component';
import { BlogListComponent } from './modules/blog/blog-list/blog-list.component';
import { BlogControlComponent } from './modules/blog/blog-control/blog-control.component';
import { BlogAddComponent } from './modules/blog/blog-add/blog-add.component';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { GalleryAddComponent } from './modules/typical/gallery/gallery-add/gallery-add.component';
import { AboutAddressComponent } from './modules/about/about-address/about-address.component';
import { ContactFromComponent } from './modules/contacts/contact-from/contact-from.component';
import {authInterceptorProviders} from "./authentication/helper/auth.interceptor";
import { ToastContainerComponent } from './modules/toast/toast-container/toast-container.component';
import { UserControlComponent } from './modules/user/user-control/user-control.component';
import { UserAddComponent } from './modules/user/user-add/user-add.component';
import { HistoryListComponent } from './modules/admin/history/history-list/history-list.component';
import { UserActivityComponent } from './modules/user/user-activity/user-activity.component';
import { CusTypicalListComponent } from './modules/typical/customer/cus-typical-list/cus-typical-list.component';
import { CusTypicalAddComponent } from './modules/typical/customer/cus-typical-add/cus-typical-add.component';
import { CusTypicalControlComponent } from './modules/typical/customer/cus-typical-control/cus-typical-control.component';
import { CusTypicalHomeComponent } from './modules/typical/customer/cus-typical-home/cus-typical-home.component';
import {SlickCarouselModule} from "ngx-slick-carousel";
import {AnimatedDigitComponent} from "../animated/animated-digit.component";
import { AlbumsComponent } from './modules/typical/albums/albums/albums.component';
import { AlbumsDetailsComponent } from './modules/typical/albums/albums-details/albums-details.component';
import { BannerControlComponent } from './modules/banner/banner-control/banner-control.component';
import { BannerAddComponent } from './modules/banner/banner-add/banner-add.component';
import { BlogDetailsComponent } from './modules/blog/blog-details/blog-details.component';

@NgModule({
  declarations: [
    AboutControlComponent,
    AboutDetailsComponent,
    AboutHomeComponent,
    AdminComponent,
    AppComponent,
    AsideComponent,
    BlogAddComponent,
    BlogControlComponent,
    BlogListComponent,
    CustomerAddComponent,
    CustomerControlComponent,
    CustomerDetailsComponent,
    CustomerListComponent,
    DashBoardComponent,
    FooterComponent,
    GalleryControlComponent,
    GalleryHomeComponent,
    HeaderComponent,
    HideMissingDirective,
    HomeComponent,
    LoginComponent,
    NavAddComponent,
    NavControlComponent,
    NavListComponent,
    NumberAddComponent,
    NumberControlComponent,
    NumberHomeComponent,
    PageNotFoundComponent,
    PostAddComponent,
    PostControlComponent,
    PostDetailsComponent,
    PostListComponent,
    ProductAddComponent,
    ProductControlComponent,
    ProductDetailsComponent,
    ProductListComponent,
    RecruitAddComponent,
    RecruitControlComponent,
    RecruitDetailsComponent,
    RecruitListComponent,
    RecruitPostComponent,
    RegisterComponent,
    SliderAddComponent,
    SliderControlComponent,
    SliderListComponent,
    GalleryAddComponent,
    AboutAddressComponent,
    ContactFromComponent,
    ToastContainerComponent,
    UserControlComponent,
    UserAddComponent,
    HistoryListComponent,
    UserActivityComponent,
    CusTypicalListComponent,
    CusTypicalAddComponent,
    CusTypicalControlComponent,
    CusTypicalHomeComponent,
    AnimatedDigitComponent,
    AlbumsComponent,
    AlbumsDetailsComponent,
    BannerControlComponent,
    BannerAddComponent,
    BlogDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterOutlet,
    FormsModule,
    NgxPaginationModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgbModule,
    SlickCarouselModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
