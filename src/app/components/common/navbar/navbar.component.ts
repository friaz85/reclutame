import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    arrPais:any = [];
    arrCiudades:any = [];
    // Navbar Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    constructor(
        public router: Router,
        private api: ReclutameService
    ) {
      this.getPaises();
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

	// Tabs 1
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

	// Tabs 2
    currentInnerTab = 'innerTab1';
    switchInnerTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentInnerTab = tab;
    }

    // Modal Popup
    isOpen = false;
    openPopup(): void {
        this.isOpen = true;
    }
    closePopup(): void {
        this.isOpen = false;
    }

    async getPaises() {
      const pais = await this.api.getPais();
      this.arrPais = pais.items;
    }

    async getCiudades(id: number) {
      const ciudad = await this.api.getCiudades(id);
      this.arrCiudades = ciudad.items;
    }

}
