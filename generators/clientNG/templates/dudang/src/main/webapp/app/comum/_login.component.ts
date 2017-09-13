import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AutorizadorService } from './autorizador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser = { email: 'admin', password: 'admin' };
  constructor(private as: AutorizadorService, private router: Router) { }

  ngOnInit() {
    this.newUser = { email: 'admin', password: 'admin' };
  }

  onSubmit(form: NgForm) {
    console.log('should register:', this.newUser);
    this.as.login(this.newUser.email, this.newUser.password).then(response => {
      if (this.as.url) {
        this.router.navigate([this.as.url]);
      }
    }
    )
  }
}


//pattern=".+@.+"