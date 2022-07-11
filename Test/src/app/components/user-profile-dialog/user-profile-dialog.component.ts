import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharingService } from 'src/app/services/sharing.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class UserProfileDialogComponent implements OnInit {
  
  displayName: string = "";
  photoURL: string = "";

  constructor(private user: UserService, private auth: AuthService, private sharing: SharingService) {
    this.user.getCurrentUser().then(user => {
      this.displayName = user.displayName != null ? user.displayName : user.email;
      this.photoURL = user.photoURL != null ? user.photoURL : user.photoURL;
     
    });
    //Chỉ thực hiện kiểm tra khi sharing service emit một sự kiện trả về giá trị true
    this.sharing.isUserLoggedIn
      .subscribe(value => {
        console.log(value)
        if (value) {

          this.user.getCurrentUser()
            .then(user => {
              this.displayName = user.displayName != null ? user.displayName : user.email;
              this.photoURL = user.photoURL != null ? user.photoURL : user.photoURL;
              console.log(user);
            });
        }
        else {
          this.displayName = "";
        }
      })
  }

  ngOnInit(): void {
    
  }
  update(){
    this.auth.update(this.displayName,this.photoURL);
  }

}
