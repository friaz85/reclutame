import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.scss']
})
export class PartnersComponent {

    partnersSlides: OwlOptions = {
		nav: false,
		margin: 25,
		loop: true,
		dots: false,
		autoplay: false,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-line'></i>",
			"<i class='ri-arrow-right-line'></i>",
		],
		responsive: {
			0: {
				items: 2
			},
			515: {
				items: 3
			},
			695: {
				items: 5
			},
			935: {
				items: 7
			},
			1200: {
				items: 7
			}
		}
    }

}