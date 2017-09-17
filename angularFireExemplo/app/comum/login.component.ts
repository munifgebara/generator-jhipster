import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AutorizadorService } from './autorizador.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.1.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser = { email: 'admin', password: 'admin' };
  user: Observable<firebase.User>;

  constructor(private as: AutorizadorService, private router: Router) {
    this.user=as.user;
    
  }


  ngOnInit() {
    this.newUser = { email: 'admin', password: 'admin' };
  }

  onSubmit(form: NgForm) {
    console.log('should register:', this.newUser);
    //this.as.login(this.newUser.email, this.newUser.password).then(response => {      if (this.as.url) {        this.router.navigate([this.as.url]);      }    }    );
  }

  login() {
    this.as.login().then(response => this.router.navigate([this.as.url]));
  }

  logout() {
    this.as.logout().then(response => this.router.navigate([this.as.url]));
  }

}


//pattern=".+@.+"