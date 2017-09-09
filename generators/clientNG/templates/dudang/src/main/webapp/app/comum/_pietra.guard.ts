import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AutorizadorService} from './autorizador.service';

@Injectable()
export class PietraGuard implements CanActivate {
 
 constructor(private as:AutorizadorService,private router:Router){

 }

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.as.url=state.url;
    if (!this.as.logado){
        this.router.navigate(['/login']);
    }
    return this.as.logado;
  }
}
