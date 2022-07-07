import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { TableComponent } from './components/table/table.component';
import { TableServerComponent } from './components/table-server/table-server.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home', component: MainComponent,
    canActivate: [AuthGuard],//khai báo guard dùng để ràng buộc phải đăng nhập mới được vào        
    children: [
      { path: 'table', component: TableComponent },
      { path: 'table-sv', component: TableServerComponent },
    ]
  },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: LoginComponent },// '**' có ý nghĩa nếu không có path nào khớp với các path đã khai báo trong routes 
  //thì mặc định sẽ chuyển hướng load LoginLayoutComponent

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
