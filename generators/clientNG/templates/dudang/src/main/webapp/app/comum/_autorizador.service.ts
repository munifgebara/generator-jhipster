import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class AutorizadorService {

  protected loginUrl = 'http://localhost:8080/api/authenticate';

  protected token="";
  logado=false;
  url="";
  constructor(private http: Http) { 

  }

  getToken(){
    return this.token;
  }

  login(usuario:string,senha:string){
    return this.http.post(this.loginUrl,{username:usuario,password:senha,rememberMe:"true"}).toPromise().then(
      response=>{
        let resposta=response.json();
        this.logado=true;
        this.token=resposta.id_token;
      }
    );

  }

}
