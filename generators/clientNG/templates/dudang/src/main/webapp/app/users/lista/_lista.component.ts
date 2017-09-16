import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService} from '../service';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['../../comum/lista.component.css']
})
export class ListaComponent implements OnInit {
  erro = {};
  lista: any[];
  cols = [];
  msgs: Message[] = [];

  constructor(private service: UserService,private  router: Router,private  route: ActivatedRoute) {
      this.service.errorHandler = error => this.showError(error.json());
    this.cols = [
          { field: 'login', header: 'Loigin' },

    ];


  }
  ngOnInit() {
    this.atualiza();
  }
  atualiza() {
    this.service.getAll().then(response => this.lista = response);
  }
  edita(id) {
    this.router.navigate(['detalhes', id], { relativeTo: this.route });
  }
  remove(id) {
    this.service.remove(id).then(() => this.atualiza());
  }
  showError(error) {
    this.msgs = [];
    console.log(error);
    this.msgs.push({ severity: 'error', summary: error.message, detail: error.description });
  }


}
