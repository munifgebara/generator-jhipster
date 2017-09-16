import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { SuperService} from '../comum/superservice.service';
import { AutorizadorService} from '../comum/autorizador.service';

@Injectable()
export class UserService extends SuperService{

  constructor( http: Http,a:AutorizadorService) {
    super('users',http,a);
   }

   getOne(id):Promise<any> {
     if (id=='new'){
       return new Promise(resolve=>{setTimeout(resolve({novo:true}),5)});
     }
    return this.http.get(`${this.baseUrl}/${this.collection}/${id}`,{headers:this.createAuthorizationHeader()})
      .toPromise().then(response=>response.json())
      .catch(this.errorHandler);
  }

  
}

