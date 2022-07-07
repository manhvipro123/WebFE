import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { SharingService } from './sharing.service';
import { UserService } from './user.service';
import { Auth, getAuth, updateProfile} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  curUser : firebase.User | null = null
  constructor(private afAuth: AngularFireAuth, private router: Router, private sharing: SharingService, public user: UserService) {
    this.afAuth.authState.subscribe((user) => {
      if(user){
        this.curUser = user
        console.log(this.curUser)
      }
    })
   }

  async signinGmail() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return await this.afAuth.signInWithPopup(provider).then(
      res => { this.sharing.isUserLoggedIn.next(true) }
    );// promise
    // .then(res => {
    //   console.log("Login success!!!")
    // })
  }

  handleRegister(email:string,password:string) {

    this.afAuth.createUserWithEmailAndPassword(email,password)
      .then((res) => {
        alert('Regist successfull');
        console.log(res.user);
        this.curUser = res.user;
        this.sharing.isUserLoggedIn.next(true);
      }).catch((err) => {
        alert(err.message);
      })
  }



  update(name: string, photoURL: string){
    this.curUser!.updateProfile({
      displayName : name, photoURL: photoURL
    }).then(() => {
      // Update successful
      // ...
      alert('Update successfull');
    }).catch((error) => {
      // An error occurred
      // ...
      alert(error.message);
    });  
  }
  

  //Tương tự viết hàm signin với tài khoản firebase như sau:
  signinFirebase(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(res => {

          resolve(res);
          localStorage.setItem('token', 'true');
          this.router.navigateByUrl("home");
          this.sharing.isUserLoggedIn.next(true);
        }, err => reject(err))
    })
  }

  logout() {
    return new Promise<any>(async (resolve, reject) => {
      if (await this.afAuth.currentUser) {
        //if (this.fauth.auth.currentUser){

        this.afAuth.signOut();
        this.sharing.isUserLoggedIn.next(false);
        resolve("log out");
      } else {
        reject();
      }

    })
  }
}
