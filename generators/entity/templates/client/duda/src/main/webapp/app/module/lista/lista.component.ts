import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { <%= entityAngularName %>Service} from '../service';
import { SuperLista } from '../../comum/superlista.component';

@Component({
  selector: 'app-lista',
  templateUrl: '../../comum/lista.component.html',
  styleUrls: ['../../comum/lista.component.css']
})
export class ListaComponent extends SuperLista implements OnInit {

  constructor(service: <%= entityAngularName %>Service, router: Router, route: ActivatedRoute) {
    super(service, router, route);
    this.cols = [
      <%_
        fields.forEach(field => {
        const fieldType = field.fieldType;
        const fieldName = field.fieldName; _%>
          { field: '<%= fieldName %>', header: '<%= fieldName %>' },
          <%_  }); _%>
    ];
  }


}
