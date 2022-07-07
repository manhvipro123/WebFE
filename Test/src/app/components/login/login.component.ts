import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // choose!: boolean;
  email: string = '';
  password: string = '';
  
  constructor(private auth: AuthService, private route: Router) { }

  // public open(){
  //   if(this.choose == false){
  //     this.choose = true;
  //   }
  //   else{
  //     this.choose = false;
  //   }
  // }
  ngOnInit(): void {
    // this.choose = false;
  }

  tryGoogleLogin(){
    this.auth.signinGmail().then(
      res=>{
        console.log("login success!")
        this.route.navigateByUrl("home");
      })
      .catch(err=>(console.log(err)))
  }

 
  tryLoginWithFirebaseAccount(){
    if(this.email == ''){
      alert('Please enter email');
      return;
    }
    if(this.password == ''){
      alert('Please enter password');
      return;
    }
    this.auth.signinFirebase(this.email,this.password);
    this.email = '';
    this.password = '';
  }


 

}
