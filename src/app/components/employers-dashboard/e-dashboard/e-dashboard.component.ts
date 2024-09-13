import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
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
    selector: 'app-e-dashboard',
    templateUrl: './e-dashboard.component.html',
    styleUrls: ['./e-dashboard.component.scss']
})
export class EDashboardComponent implements OnInit {

    @ViewChild("chart") chart: ChartComponent | undefined;
    public chartOptions: Partial<ChartOptions>  | undefined;

    reclutador:any = [];
    totalCandidatos = 0;
    totalVacantes = 0;
    arrNotificaciones: any = [];
    arrDatosGrafica: any = [];
    arrCandidatosRecientes: any = [];

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
      private auth: AuthService,
      private ref: ChangeDetectorRef
      ) {
        this.getReclutador();
        this.getTarjetasDashboard();
        this.geNotificaciones();
        this.getAplicantesRecientes();


    }

    async ngOnInit() {

      await this.getDatosGrafica();

      this.chartOptions = {
        series: [
            {
                name: "Candidatos",
                data: this.arrDatosGrafica.map((item: any) => item.numero_candidatos)
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
            categories: this.arrDatosGrafica.map((item: any) => this.meses.find((mes:any) => mes.id === item.mes)?.name),
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

    async getReclutador() {
        this.spinner.show();
        try{
          const rec = await this.api.getReclutador(this.auth.currentUserValue.p_id_reclutador);
          console.log(rec);
          this.reclutador = rec.items[0];
        } catch (error) {
          console.log(error);
        }
        this.spinner.hide();
    }

    async getTarjetasDashboard() {
        this.spinner.show();
        try{
          const tarjetas = await this.api.getTarjetasDashboard(this.auth.currentUserValue.p_id_reclutador);
          //console.log("VALOR DE TARJETAS",tarjetas);
          //this.reclutador = rec.items[0];
          this.totalCandidatos = tarjetas.p_total_candidatos;
          this.totalVacantes = tarjetas.p_total_vacantes;
        } catch (error) {
          console.log(error);
        }
        this.spinner.hide();
    }

    async geNotificaciones() {
        this.spinner.show();
        try {
          const notificaciones = await this.api.geNotificaciones(this.auth.currentUserValue.p_id_reclutador);
          //console.log(arrNotificaciones);
          this.arrNotificaciones = notificaciones.p_result;
        } catch (err) {
          console.error;
        }
        this.spinner.hide();
      }

      async getDatosGrafica () {
        const arr =  await this.api.getCandidatosPostulaciones(this.auth.currentUserValue.p_id_reclutador);
        this.arrDatosGrafica = arr.p_result;
          console.log('arr', this.arrDatosGrafica);
          console.log(this.chartOptions)
          // if (this.chartOptions && this.chartOptions.series) {
          //     this.chartOptions.series[0].data = this.arrDatosGrafica.map((item: any) => item.numero_candidatos);
          // }
          // if (this.chartOptions.xaxis) {
          //     this.chartOptions.xaxis.categories = this.arrDatosGrafica.map((item: any) => item.mes);
          // }
          // console.log(this.chartOptions);

          // this.ref.detectChanges();

        }

        async getAplicantesRecientes() {
            this.spinner.show();
            try {
              const candidatosRecientes = await this.api.getAplicantesRecientes(this.auth.currentUserValue.p_id_reclutador);
              console.log('candidatos recientes',candidatosRecientes);
              this.arrCandidatosRecientes = candidatosRecientes.p_result;
            } catch (err) {
              console.error;
            }
            this.spinner.hide();
          }

}
