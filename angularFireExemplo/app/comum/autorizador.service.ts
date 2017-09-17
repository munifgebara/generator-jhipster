import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AutorizadorService {

  protected loginUrl = 'http://localhost:8080/api/authenticate';
  public user: Observable<firebase.User>;

  protected token="";
  logado=false;
  url="";
  constructor(private http: Http,private afAuth: AngularFireAuth) { 
       this.user = afAuth.authState;
  }

  getToken(){
    return this.token;
  }
  
  
  login() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(_=>this.logado=true);     
  }

  logout() {
    return this.afAuth.auth.signOut().then(_=>this.logado=false);
  }


  //login(usuario:string,senha:string){
    //return new Promise(resolve=>{this.logado=true;this.token='OK'});

    // return this.http.post(this.loginUrl,{username:usuario,password:senha,rememberMe:"true"}).toPromise().then(
    //   response=>{
    //     let resposta=response.json();
    //     this.logado=true;
    //     this.token=resposta.id_token;
    //   }
  

  //}

}
