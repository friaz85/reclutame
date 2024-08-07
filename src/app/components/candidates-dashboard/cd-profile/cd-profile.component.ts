import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
  selector: 'app-cd-profile',
  templateUrl: './cd-profile.component.html',
  styleUrls: ['./cd-profile.component.scss']
})
export class CdProfileComponent {
  arrPais:any = [];
  arrCiudades:any = [];
  frmCandidato: FormGroup | any;
  submitted = false;

  constructor(
    private api: ReclutameService,
    private formBuilder: FormBuilder
    ) {
      this.getPaises();
      this.getCandidato(15);
    }

    ngOnInit(): void {
      this.frmCandidato = this.formBuilder.group({
        nombre: ["", Validators.required],
        apellido: ["", Validators.required],
        email: ["", Validators.required],
        telefono: ["", Validators.required],
        descripcion: ["", Validators.required],
        facebook_url: ["", Validators.required],
        twitter_url: ["", Validators.required],
        linkedin_url: ["", Validators.required],
        instagram_url: ["", Validators.required],
        id_pais: ["", Validators.required],
        id_ciudad: ["", Validators.required],
        domicilio: ["", Validators.required],
      });
    }

    get fCo() {
      return this.frmCandidato.controls;
    }

    async getPaises() {
      const pais = await this.api.getPais();
      this.arrPais = pais.items;
    }

    async getCiudades(id: number) {
      const ciudad = await this.api.getCiudades(id);
      this.arrCiudades = ciudad.items;
    }

    async getCandidato(id: number){
      const candidato: any = await this.api.getCandidato(id);
      console.log(candidato);

      this.getCiudades(candidato.items[0].id_pais);

      this.frmCandidato.setValue({
        nombre: candidato.items[0].nombre,
        apellido: candidato.items[0].apellido,
        email: candidato.items[0].email,
        telefono: candidato.items[0].telefono,
        descripcion: candidato.items[0].descripcion,
        facebook_url: candidato.items[0].facebook_url,
        twitter_url: candidato.items[0].twitter_url,
        linkedin_url: candidato.items[0].linkedin_url,
        instagram_url: candidato.items[0].instagram_url,
        id_pais: candidato.items[0].id_pais,
        id_ciudad: candidato.items[0].id_ciudad,
        domicilio: candidato.items[0].domicilio
      });
    }

    updateCandidato(){

    }



}
