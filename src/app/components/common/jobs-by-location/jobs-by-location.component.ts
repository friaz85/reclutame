import { Component, ElementRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
    selector: 'app-jobs-by-location',
    templateUrl: './jobs-by-location.component.html',
    styleUrls: ['./jobs-by-location.component.scss']
})
export class JobsByLocationComponent {
    arrPais:any = [];
    jobsByLocationSlides: OwlOptions = {
		nav: true,
		margin: 25,
		loop: true,
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-line'></i>",
			"<i class='ri-arrow-right-line'></i>",
		],
		responsive: {
			0: {
				items: 1
			},
			515: {
				items: 2
			},
			695: {
				items: 2
			},
			935: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
    }

    constructor(
      private api: ReclutameService,
      private el: ElementRef) {
        this.getPaises();

      }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let myTag = this.el.nativeElement.querySelector(".owl-nav");
    console.log
  }

  async getPaises() {
    const pais = await this.api.getPais();
    this.arrPais = pais.items;
    console.log("Paises: ", this.arrPais);
  }

}
