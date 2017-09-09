import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { SuperService} from '../comum/superservice.service';
import { AutorizadorService} from '../comum/autorizador.service';

@Injectable()
export class <%= entityAngularName %>Service extends SuperService{

  constructor( http: Http,a:AutorizadorService) {
    super('<%= entityApiUrl %>',http,a);
   }
  
}
