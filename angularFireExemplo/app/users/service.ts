import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DudaFirebaseService} from '../comum/duda-firebase.service';
import { AutorizadorService} from '../comum/autorizador.service';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class UserService extends DudaFirebaseService{

  constructor(db: AngularFireDatabase) {
    super(db,'users');
   }

  
}


