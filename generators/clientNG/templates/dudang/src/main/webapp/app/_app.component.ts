import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  items: MenuItem[];


  ngOnInit() {
    console.log('Inicio');
    this.items = [{
      label: 'Principal',
      items: [
        { label: 'Dashboard', icon: 'fa-download', routerLink: ['./dashboard'] },
     /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */
      ]
    },
    {
      label: 'Cadastros',
      items: [
        { label: 'Users', icon: 'fa-download', routerLink: ['./users'] },
        /* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */
      ]
    }
    ];
  }

}


    
