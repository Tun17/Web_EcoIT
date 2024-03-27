import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./modules/home/home-page/home.component";
import {PageNotFoundComponent} from "./authentication/404/page-not-found.component";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {RecruitListComponent} from "./modules/recruit/recruit-list/recruit-list.component";
import {PostListComponent} from "./modules/post/post-list/post-list.component";
import {PostDetailsComponent} from "./modules/post/post-details/post-details.component";
import {AboutDetailsComponent} from "./modules/about/about-details/about-details.component";
import {RecruitDetailsComponent} from "./modules/recruit/recruit-details/recruit-details.component";
import {ProductDetailsComponent} from "./modules/product/product-details/product-details.component";
import {NumberAddComponent} from "./modules/typical/number/number-add/number-add.component";
import {CustomerDetailsComponent} from "./modules/customer/customer-details/customer-details.component";
import {BlogListComponent} from "./modules/blog/blog-list/blog-list.component";
import {ContactFromComponent} from "./modules/contacts/contact-from/contact-from.component";
import {AuthenticateService} from "./authentication/authenticate.service";
import {CusTypicalListComponent} from "./modules/typical/customer/cus-typical-list/cus-typical-list.component";
import {BlogDetailsComponent} from "./modules/blog/blog-details/blog-details.component";

const routes: Routes = [
  {path: 'trang-chu', component: HomeComponent},
  {path: 'tuyen-dung', component: RecruitListComponent},
  {path: 'tuyen-dung/:url', component: RecruitDetailsComponent},
  {path: 'tin-tuc', component: PostListComponent},
  {path: 'tin-tuc/:url', component: PostDetailsComponent},
  {path: 'san-pham/:url', component: ProductDetailsComponent},
  {path: 've-chung-toi', component: AboutDetailsComponent},
  {path: 'khach-hang/:url', component: CustomerDetailsComponent},
  {path: 'khach-hang-tieu-bieu', component: CusTypicalListComponent},
  {path: 'blog', component: BlogListComponent},
  {path: 'blog/:url', component: BlogDetailsComponent},
  {path: 'lien-he', component: ContactFromComponent},

  {path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full'},
  {path: 'admin', canActivate: [AuthenticateService],
    loadChildren: () => import('./modules/_container/admin.module').then(m => m.AdminModule)},

  {path: 'd/typical-number/new', component: NumberAddComponent},
  {path: 'd/typical-number/update/:id', component: NumberAddComponent},

  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},

  {path: '', redirectTo: '/trang-chu', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
