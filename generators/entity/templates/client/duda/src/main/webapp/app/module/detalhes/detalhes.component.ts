import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { <%= entityAngularName %>Service} from '../service';
import { SuperDetalhes } from '../../comum/superdetalhes.component';



<%_
let hasRelationshipQuery = false;
let uni = [];
Object.keys(differentRelationships).forEach(key => {
    const hasAnyRelationshipQuery = differentRelationships[key].some(rel =>
        (rel.relationshipType === 'one-to-one' && rel.ownerSide === true && rel.otherEntityName !== 'user')
            || rel.relationshipType !== 'one-to-many'
    );
    if (hasAnyRelationshipQuery) {
        hasRelationshipQuery = true;
    }
    if (differentRelationships[key].some(rel => rel.relationshipType !== 'one-to-many')) {
        const uniqueRel = differentRelationships[key][0];
        if (uniqueRel.otherEntityAngularName !== entityAngularName) {
          uni.push(uniqueRel);

        }
    }
}); _%>


<%_
   for (idx in uni){_%>
//<%=uni[idx].otherEntityAngularName %> <%=uni[idx].otherEntityName %>
<%_   }
_%>


<%_
 hasRelationshipQuery = false;
Object.keys(differentRelationships).forEach(key => {
    const hasAnyRelationshipQuery = differentRelationships[key].some(rel =>
        (rel.relationshipType === 'one-to-one' && rel.ownerSide === true && rel.otherEntityName !== 'user')
            || rel.relationshipType !== 'one-to-many'
    );
    if (hasAnyRelationshipQuery) {
        hasRelationshipQuery = true;
    }
    if (differentRelationships[key].some(rel => rel.relationshipType !== 'one-to-many')) {
        const uniqueRel = differentRelationships[key][0];
        if (uniqueRel.otherEntityAngularName !== entityAngularName) {
_%>
import { <%= uniqueRel.otherEntityAngularName%>Service } from '../../<%= uniqueRel.otherEntityModulePath %>/service';
<%_     }
    }
}); _%>



@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})

export class DetalhesComponent extends SuperDetalhes implements OnInit {

  constructor(service: <%= entityAngularName %>Service, router: Router, route: ActivatedRoute<%_ for (idx in uni) {
    const otherEntityName = uni[idx].otherEntityName;
    const otherEntityNameCapitalized = uni[idx].otherEntityNameCapitalized;
    const relationshipType = uni[idx].relationshipType;
    if (relationshipType === 'many-to-one' || relationshipType === 'one-to-one'){
  _%>, private <%=otherEntityName%>Service:<%=otherEntityNameCapitalized%>Service<%_ }} _%>) {
    super(service, router, route);
  }
  
  ngOnInit() {
    super.ngOnInit();
<%_ for (idx in uni) {
      const relationshipType = uni[idx].relationshipType;
    if (relationshipType === 'many-to-one' || relationshipType === 'one-to-one'){  _%>
    this.atualiza<%= uni[idx].otherEntityNameCapitalized %>();
<%_ }} _%>
  }
     <%_ for (idx in uni) {
        const relationshipType = uni[idx].relationshipType;
        const ownerSide = uni[idx].ownerSide;
        const otherEntityName = uni[idx].otherEntityName;
        const otherEntityNamePlural = uni[idx].otherEntityNamePlural;
        const otherEntityNameCapitalized = uni[idx].otherEntityNameCapitalized;
        const relationshipName = uni[idx].relationshipName;
        const relationshipNameHumanized = uni[idx].relationshipNameHumanized;
        const relationshipFieldName = uni[idx].relationshipFieldName;
        const relationshipFieldNamePlural = uni[idx].relationshipFieldNamePlural;
        const otherEntityField = uni[idx].otherEntityField;
        const otherEntityFieldCapitalized = uni[idx].otherEntityFieldCapitalized;
        const relationshipRequired = uni[idx].relationshipRequired;
        const translationKey = relationshipName;
        if (relationshipType === 'many-to-one' || relationshipType === 'one-to-one'){ _%>

  lista<%=otherEntityNamePlural %>=[];

  atualiza<%= otherEntityNameCapitalized %>(){
    this.<%= otherEntityName %>Service.getAll().then(response=>{this.lista<%=otherEntityNamePlural %>=this.converte<%= otherEntityNameCapitalized %>(response.values);});
  }

  converte<%= otherEntityNameCapitalized %>(lista:any[]){
    let retorno=[];
    retorno.push({label:'Selecione', value:null});
    for(let obj of lista){
      retorno.push({label:obj.<%=otherEntityField%>, value:obj});
    }
    return retorno;
  }
<%_ }} _%>
}
