import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserService} from '../service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})

export class DetalhesComponent implements OnInit {

  authorities = ['ROLE_ADMIN','ROLE_USER'];
  selecionado = {};
  items = [{label: 'Cancelar', icon: 'fa-close', command: () => {this.cancelar();} }];

  constructor(private service:UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id=this.route.snapshot.paramMap.get('id');
    let a=this.service.getOne(id).then(resolve=>{this.selecionado=resolve}).catch(error=>console.log(error));
  }
  
  cancelar() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
  
  salvar() {
    if (this.selecionado['novo']) {
      this.service.add(this.selecionado).then((data) => this.router.navigate(['../..'], { relativeTo: this.route }));
    }
    else {
      this.service.update(this.selecionado).then((data) => this.router.navigate(['../..'], { relativeTo: this.route }));
    }
  }
}

