import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { <%= entityAngularName %>Service} from '../service';
import { SuperDetalhes } from '../../comum/superdetalhes.component';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent extends SuperDetalhes implements OnInit {

  constructor(service: <%= entityAngularName %>Service, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }
  ngOnInit() {
    super.ngOnInit();
  }
}
