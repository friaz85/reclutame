import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReclutameService } from 'src/services/reclutame.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ed-company-profile',
  templateUrl: './ed-company-profile.component.html',
  styleUrls: ['./ed-company-profile.component.scss']
})
export class EdCompanyProfileComponent {
  arrPais:any = [];
  arrCiudades:any = [];
  frmCompany: FormGroup | any;
  submitted = false;

  constructor(
    private api: ReclutameService,
    private formBuilder: FormBuilder
    ) {
    this.getPaises();
    this.getEmpresa(9);
  }

    ngOnInit(): void {
    this.frmCompany = this.formBuilder.group({
      nombre_empresa: ["", Validators.required],
      email: ["", Validators.required],
      telefono: ["", Validators.required],
      sitio_web: ["", Validators.required],
      anio_empresa: ["", Validators.required],
      tamano_equipo: ["", Validators.required],
      categoria_empresa: ["", Validators.required],
      acerca_empresa: ["", Validators.required],
      facebook_url: ["", Validators.required],
      twitter_url: ["", Validators.required],
      linkedin_url: ["", Validators.required],
      instagram_url: ["", Validators.required],
      id_pais: ["", Validators.required],
      id_ciudad: ["", Validators.required],
      domicilio: ["", Validators.required],
      latitud: [""],
      longitud: [""],
      allow: [""],
    });
  }

  get fCo() {
    return this.frmCompany.controls;
  }

  async getPaises() {
    const pais = await this.api.getPais();
    this.arrPais = pais.items;
  }

  async getCiudades(id: number) {
    const ciudad = await this.api.getCiudades(id);
    this.arrCiudades = ciudad.items;
  }

  async getEmpresa(id: number) {
    const empresa = await this.api.getEmpresa(id);
    console.log(empresa);

    this.getCiudades(empresa.items[0].id_pais);

    this.frmCompany.setValue({
      nombre_empresa: empresa.items[0].nombre_empresa,
      email: empresa.items[0].email,
      telefono: empresa.items[0].telefono,
      sitio_web: empresa.items[0].sitio_web,
      anio_empresa: empresa.items[0].anio_empresa,
      tamano_equipo: empresa.items[0].tamano_equipo,
      categoria_empresa: empresa.items[0].categoria_empresa,
      acerca_empresa: empresa.items[0].acerca_empresa,
      facebook_url: empresa.items[0].facebook_url,
      twitter_url: empresa.items[0].twitter_url,
      linkedin_url: empresa.items[0].linkedin_url,
      instagram_url: empresa.items[0].instagram_url,
      id_pais: empresa.items[0].id_pais,
      id_ciudad: empresa.items[0].id_ciudad,
      domicilio: empresa.items[0].domicilio,
      latitud: 0,
      longitud: 0,
      allow: 1
    });
  }

  updateEmpresa() {
    this.submitted = true;
    if (this.frmCompany.invalid) {
      return;
    }

    console.log(this.frmCompany.value);

    try {
      this.api.updateEmpresa(
        9,
        this.frmCompany.value.nombre_empresa,
        this.frmCompany.value.email,
        this.frmCompany.value.sitio_web,
        this.frmCompany.value.anio_empresa,
        this.frmCompany.value.tamano_equipo,
        this.frmCompany.value.categoria_empresa,
        this.frmCompany.value.acerca_empresa,
        this.frmCompany.value.facebook_url,
        this.frmCompany.value.twitter_url,
        this.frmCompany.value.linkedin_url,
        this.frmCompany.value.instagram_url,
        this.frmCompany.value.id_pais,
        this.frmCompany.value.id_ciudad,
        this.frmCompany.value.domicilio,
        this.frmCompany.value.telefono
      ).then((res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Update completed.'
        })
      });
    } catch (error: any) {
      console.log('Error Status: ', error.status);
    }
  }

}
