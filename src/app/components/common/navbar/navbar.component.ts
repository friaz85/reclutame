import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ReclutameService } from 'src/services/reclutame.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    arrPais:any = [];
    arrCiudades:any = [];
    frmCandidato: FormGroup | any;
    frmCompany: FormGroup | any;
    submittedCandidato = false;
    checkTerminosCandidato = false;

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
        private api: ReclutameService,
        private formBuilder: FormBuilder,
    ) {
      this.getPaises();
    }

    ngOnInit(): void {
      this.frmCandidato = this.formBuilder.group({
        nombreCandidato: ["", Validators.required],
        apellidoCandidato: ["", Validators.required],
        emailCandidato: ["", Validators.required],
        telefonoCandidato: ["", Validators.required],
        passwordCandidato: ["", Validators.required],
      });

      this.frmCompany = this.formBuilder.group({
        comentario: [],
      });
    }

    get f() {
      return this.frmCandidato.controls;
    }

    get fCo() {
      return this.frmCompany.controls;
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

    async registroCandidato() {
      console.log(this.frmCandidato.value);
      console.log(this.f.nombreCandidato.value);

      this.submittedCandidato = true;
      if (this.frmCandidato.invalid) {
        return;
      }

      const reg = await this.api.registroUsuario(this.f.emailCandidato.value, this.f.passwordCandidato.value, 2, "", 0);
      console.log(reg);
      const regCandidato = await this.api.registroCandidato(this.f.nombreCandidato.value, this.f.apellidoCandidato.value, this.f.emailCandidato.value, this.f.telefonoCandidato.value, reg.ID_USUARIO);
      console.log(regCandidato);
    }

    checkTyCCandidato(event: any) {
      this.checkTerminosCandidato = event.currentTarget.checked;
    }

}
