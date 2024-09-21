import { Component, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexYAxis,
    ApexDataLabels,
    ApexTitleSubtitle,
    ApexStroke,
    ApexGrid
} from "ng-apexcharts";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "src/services/auth.service";
import { ReclutameService } from "src/services/reclutame.service";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    colors: any;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-c-dashboard',
    templateUrl: './c-dashboard.component.html',
    styleUrls: ['./c-dashboard.component.scss']
})
export class CDashboardComponent {

    @ViewChild("chart") chart: ChartComponent | undefined;
    public chartOptions: Partial<ChartOptions> | undefined;

    candidato: any = [];
    pTotalVacantesAplicadas = 0;
    pTotalVacantesCategoria = 0;
    arrNotificaciones: any = [];
    arrDatosGrafica: any = [];


    meses = [
        { id: 1, name: 'Ene' },
        { id: 2, name: 'Feb' },
        { id: 3, name: 'Mar' },
        { id: 4, name: 'Abr' },
        { id: 5, name: 'May' },
        { id: 6, name: 'Jun' },
        { id: 7, name: 'Jul' },
        { id: 8, name: 'Ago' },
        { id: 9, name: 'Sep' },
        { id: 10, name: 'Oct' },
        { id: 11, name: 'Nov' },
        { id: 12, name: 'Dic' },
      ];

    constructor(
      private api: ReclutameService,
      private formBuilder: FormBuilder,
      private spinner: NgxSpinnerService,
      private auth: AuthService
    ) {

      this.getCandidato();
      this.getTarjetasDashboard();
      this.geNotificaciones();
    
    }

    async ngOnInit() {

        await this.getDatosGrafica();
    
        this.chartOptions = {
          series: [
            {
              name: "Total de Postulaciones",
              data: this.arrDatosGrafica.map((item: any) => item.total_postulaciones)
            }
          ],
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: [
            "#1cbe72"
          ],
          stroke: {
            curve: "straight"
          },
          grid: {
            show: true,
            strokeDashArray: 5,
            borderColor: "#e0e6e9",
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5
            }
          },
          xaxis: {
            categories: this.arrDatosGrafica.map((item: any) => this.meses.find((mes: any) => mes.id === item.mes)?.name),
            labels: {
              style: {
                colors: "#62646A",
                fontSize: "15px"
              }
            },
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: "#62646A",
                fontSize: "15px"
              }
            },
            axisBorder: {
              show: false
            }
          }
        };
      }

      async getDatosGrafica() {
        const arr = await this.api.getPostulacionesMes(this.auth.currentUserValue.p_id_candidato);
        this.arrDatosGrafica = arr.p_result;
        console.log('arr', this.arrDatosGrafica);
        console.log(this.chartOptions)
    
      }

    async getCandidato() {
      this.spinner.show();
      try{
        const rec = await this.api.getCandidato(this.auth.currentUserValue.p_id_candidato);
        console.log(rec);
        this.candidato = rec.items[0];
      } catch (error) {
        console.log(error);
      }
      this.spinner.hide();
  }

  async getTarjetasDashboard() {
    this.spinner.show();
    try {
      const tarjetas = await this.api.getTarjetasDashboardCandidato(this.auth.currentUserValue.p_id_candidato);
      console.log("VALOR DE TARJETAS",tarjetas);
      //this.reclutador = rec.items[0];
      this.pTotalVacantesAplicadas = tarjetas.p_total_vacantes_aplicadas;
      this.pTotalVacantesCategoria = tarjetas.p_total_vacantes_categoria;
    } catch (error) {
      console.log(error);
    }
    this.spinner.hide();
  }    

  async geNotificaciones() {
    this.spinner.show();
    try {
      const notificaciones = await this.api.geNotificacionesCandidato(this.auth.currentUserValue.p_id_candidato);
      //console.log(arrNotificaciones);
      this.arrNotificaciones = notificaciones.p_result;
    } catch (err) {
      console.error;
    }
    this.spinner.hide();
  }

}
