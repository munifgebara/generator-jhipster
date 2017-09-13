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
     <%_ for (idx in relationships) {
        const relationshipType = relationships[idx].relationshipType;
        const ownerSide = relationships[idx].ownerSide;
        const otherEntityName = relationships[idx].otherEntityName;
        const otherEntityNamePlural = relationships[idx].otherEntityNamePlural;
        const otherEntityNameCapitalized = relationships[idx].otherEntityNameCapitalized;
        const relationshipName = relationships[idx].relationshipName;
        const relationshipNameHumanized = relationships[idx].relationshipNameHumanized;
        const relationshipFieldName = relationships[idx].relationshipFieldName;
        const relationshipFieldNamePlural = relationships[idx].relationshipFieldNamePlural;
        const otherEntityField = relationships[idx].otherEntityField;
        const otherEntityFieldCapitalized = relationships[idx].otherEntityFieldCapitalized;
        const relationshipRequired = relationships[idx].relationshipRequired;
        const translationKey = relationshipName; _%>
{ field: '<%= relationshipFieldName %>.<%= otherEntityField %>', header: '<%= relationshipNameHumanized %>' },
<%_ } _%>




    ];
  }


}
