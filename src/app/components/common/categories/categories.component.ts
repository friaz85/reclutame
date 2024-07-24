import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  arrCategorias:any = [];
    constructor(
        public router: Router,
        private api: ReclutameService
    ) { }

    ngOnInit() {
        this.getCategorias();
    }

    async getCategorias() {
        const cat = await this.api.getCategorias();
        this.arrCategorias = cat.items;
        console.log("Categorías: ", this.arrCategorias);
    }

    getDelay(i: any) {
      console.log("Delay: ", i*100);
        return i*100;
    }

}
