import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { <%= entityAngularName %>Service} from '../service';
import { SuperDetalhes } from '../../comum/superdetalhes.component';
<%_ for (idx in relationships) { 
  
  const otherEntityName = relationships[idx].otherEntityName; 
  const otherEntityNameCapitalized = relationships[idx].otherEntityNameCapitalized; 
      const relationshipType = relationships[idx].relationshipType;
      const caminho=relationships[idx].otherEntityModulePath;

if (entityAngularName===otherEntityNameCapitalized){
  continue;

}

    if (relationshipType === 'many-to-one' || relationshipType === 'one-to-one'){

  _%>import { <%=otherEntityNameCapitalized%>Service } from "../../<%= caminho %>/service";


<%_ }} _%>  

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})

export class DetalhesComponent extends SuperDetalhes implements OnInit {

  constructor(service: <%= entityAngularName %>Service, router: Router, route: ActivatedRoute<%_ for (idx in relationships) {
    const otherEntityName = relationships[idx].otherEntityName;
    const otherEntityNameCapitalized = relationships[idx].otherEntityNameCapitalized;
    const relationshipType = relationships[idx].relationshipType;
    if (relationshipType === 'many-to-one' || relationshipType === 'one-to-one'){
  _%>, private <%=otherEntityName%>Service:<%=otherEntityNameCapitalized%>Service<%_ }} _%>) {
    super(service, router, route);
  }
  
  ngOnInit() {
    super.ngOnInit();
<%_ for (idx in relationships) {
      const relationshipType = relationships[idx].relationshipType;
    if (relationshipType === 'many-to-one' || relationshipType === 'one-to-one'){  _%>
    this.atualiza<%= relationships[idx].otherEntityNameCapitalized %>();
<%_ }} _%>
  }
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
