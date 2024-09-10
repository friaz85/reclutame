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
    selector: 'app-e-dashboard',
    templateUrl: './e-dashboard.component.html',
    styleUrls: ['./e-dashboard.component.scss']
})
export class EDashboardComponent {

    @ViewChild("chart") chart: ChartComponent | undefined;
    public chartOptions: Partial<ChartOptions>;

    reclutador:any = [];

    constructor(
      private api: ReclutameService,
      private formBuilder: FormBuilder,
      private spinner: NgxSpinnerService,
      private auth: AuthService
      ) {
        this.getReclutador();

        this.chartOptions = {
            series: [
                {
                    name: "Views",
                    data: [0, 41, 35, 51, 49, 62, 69, 91, 148]
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
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep"
                ],
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

}
