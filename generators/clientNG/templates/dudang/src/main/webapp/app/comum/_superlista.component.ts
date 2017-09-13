import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Message } from 'primeng/primeng';


export class SuperLista {

  erro = {};
  lista: any[];
  cols = [];
  msgs: Message[] = [];

  constructor(protected service, protected router: Router, protected route: ActivatedRoute) {
    this.service.errorHandler = error => this.showError(error.json());
  }
  ngOnInit() {
    this.atualiza();
  }
  atualiza() {
    this.service.getAll().then(response => this.lista = response.values);
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