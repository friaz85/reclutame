import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/services/auth.service';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
  selector: 'app-cd-jobs-listing',
  templateUrl: './cd-jobs-listing.component.html',
  styleUrls: ['./cd-jobs-listing.component.scss']
})
export class CdJobsListingComponent implements OnInit {

  title = 'Jobs Listing';

  arrVacantes = [];
  arrPais = [];
  responseVacante: any = [];
  reclutador:any = [];
  empresa: any = [];

  constructor(
    private titleService:Title,
    private api: ReclutameService,
    private auth: AuthService
    ) {
      this.getVacantes();
      this.getPaises();
    }

  ngOnInit() {
      this.titleService.setTitle(this.title);

  }

    // Modal Popup
    isOpen = false;
    openPopup(item: any): void {
      this.isOpen = true;

      console.log(item);

      this.empresa = item.nombre_empresa;

      this.responseVacante = {
        'vacancy_name': item.titulo_vacante,
        'Job Type': item.nombre_tipo_trabajo,
        'technical_requirements': item.descripcion_vacante,
        'Career level': item.nombre_nivel_profesional,
        'Industry': item.nombre_industria,
        'Qualification': item.nombre_grado_escolar,
        'Experience': item.nombre_experiencia,
        'City': item.nombre_ciudad,
        'Country': item.nombre_pais,
        'Specialisms': item.nombre_categoria,
        'Gender': item.nombre_genero,
        'Offered salary (monthly)': item.rango,
        'Application deadline date': item.fecha_limite_solicitud,
        'id_vacante': item.id_vacante
      }
    }
    closePopup(): void {
      this.isOpen = false;
    }

  async getVacantes() {
      try {
        const vacantes = await this.api.getVacantes();
        console.log(vacantes);
        this.arrVacantes = vacantes.p_result;

      } catch (err) {
        console.error;
      }
  }

  async getPaises() {
    const pais = await this.api.getPais();
    this.arrPais = pais.items;
    console.log("Paises: ", this.arrPais);
  }

}
