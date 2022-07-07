import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(	public afAuth: AngularFireAuth) { }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged(function(user){
      if (user) {
        resolve(user);
      } else {				 
        reject('No user logged in');
      }
      })
  })
}
}
