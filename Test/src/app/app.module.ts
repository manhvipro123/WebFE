import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


import { environment } from 'src/environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './components/main/main.component';
import { TableComponent } from './components/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddComponent } from './components/dialog-add/dialog-add.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DialogUpdateComponent } from './components/dialog-update/dialog-update.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatSortModule } from '@angular/material/sort';
import { NgxPaginationModule } from 'ngx-pagination';
import { DialogDetailComponent } from './components/dialog-detail/dialog-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { TableServerComponent } from './components/table-server/table-server.component';
import { InsertItemComponent } from './components/insert-item/insert-item.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailItemComponent } from './components/detail-item/detail-item.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserProfileDialogComponent } from './components/user-profile-dialog/user-profile-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MainComponent,
    TableComponent,
    DialogAddComponent,
    DialogUpdateComponent,
    DialogDetailComponent,
    TableServerComponent,
    InsertItemComponent,
    UpdateItemComponent,
    LoginComponent,
    RegisterComponent,
    DetailItemComponent,
    UserProfileDialogComponent,
    DeleteDialogComponent,
    DeleteItemComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // AngularFireStorage,
    BrowserAnimationsModule, // imports firebase/auth, only needed for auth features=> dùng cho chức năng update
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    MatSortModule,
    NgxPaginationModule,
    HttpClientModule,
    MatTooltipModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
