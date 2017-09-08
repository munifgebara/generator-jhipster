import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(r: Router) {
    this.logaRotas("/", r.config);
  }

  logaRotas(pai: String, rotas: Routes) {
    for (let i = 0; i < rotas.length; i++) {
      console.log("path:", pai, rotas[i].path, rotas[i].component ? rotas[i].component : "-->" + rotas[i].redirectTo);
      if (rotas[i].children) {
        this.logaRotas(rotas[i].path + "/", rotas[i].children);
      }
    }
  }
}