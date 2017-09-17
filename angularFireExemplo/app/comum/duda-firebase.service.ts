import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class DudaFirebaseService {

//  item: FirebaseObjectObservable<any>;
  items: FirebaseListObservable<any>;

  constructor(protected db: AngularFireDatabase,protected colecao:string) { 
    this.items = db.list('/'+colecao);

  }

  errorHandler = error => console.error(' service error', error);

  add(objeto){
    delete objeto.novo;
    const promise=this.items.push(objeto);
    return promise.then(obj => obj).catch(err =>this.errorHandler(err));
  }

  getAll():Promise<any>{
    return new Promise(resolve=>{resolve(this.items)});
  }

  getOne(id){
    if (id==='new'){
      return this.newObject();
    }
    let url=this.colecao+'/'+id;
    return this.db.object(url).first().toPromise();
    
  }
  newObject():Promise<any>{
    return new Promise(resolve=>{resolve({novo:true})});
  }

  update(objeto){
    delete objeto.novo;
    const promise=this.items.update(objeto.$key,objeto);
    return promise.then(obj => obj).catch(err =>this.errorHandler(err));
  }

  remove(id){
    const promise=this.items.remove(id);
    return promise.then(obj => obj).catch(err =>this.errorHandler(err));
  }
   
}
