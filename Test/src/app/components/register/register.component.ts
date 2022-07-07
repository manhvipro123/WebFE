import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  name: string = '';
  photoURL: string = '';
  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  tryCreateFirebaseAccount(){
    if(this.email == ''){
      alert('Please enter email');
      return;
    }
    if(this.password == ''){
      alert('Please enter password');
      return;
    }
    this.auth.handleRegister(this.email,this.password);
  
    this.email = '';
    this.password = '';
  }

  update(){
    this.auth.update(this.name,this.photoURL);
  }

}
