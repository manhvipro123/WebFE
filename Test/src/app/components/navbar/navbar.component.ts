import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharingService } from 'src/app/services/sharing.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  displayName: string = "";
  photoURL: string = "";
  constructor(private user: UserService, private auth: AuthService, private route: Router, private sharing: SharingService, public dialog: MatDialog) {

    this.user.getCurrentUser().then(user => {
      this.displayName = user.displayName != null ? user.displayName : user.email;
      this.photoURL = user.photoURL != null ? user.photoURL : user.photoURL;
    });
    //Chỉ thực hiện kiểm tra khi sharing service emit một sự kiện trả về giá trị true
    this.sharing.isUserLoggedIn
      .subscribe(value => {
        if (value) {
          this.user.getCurrentUser()
            .then(user => {
              this.displayName = user.displayName != null ? user.displayName : user.email;
              this.photoURL = user.photoURL != null ? user.photoURL : user.photoURL;
            });
        }
        else {
          this.displayName = "";
        }
      })
  }

  Logout() {
    this.auth.logout();
    this.route.navigateByUrl("");
    console.log("logout success!")
  }

  openUserProfileDialog() {
    const dialogRef = this.dialog.open(UserProfileDialogComponent, {
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
  }


}
