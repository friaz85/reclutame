import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ReclutameService } from 'src/services/reclutame.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  arrPais: any = [];
  arrCiudades: any = [];
  frmCandidato: FormGroup | any;
  frmCompany: FormGroup | any;
  frmLogin: FormGroup | any;
  submittedCandidato = false;
  submittedCompany = false;
  submittedLogin = false;
  checkTerminosCandidato = false;
  checkTerminosCcompany = false;

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
    private apiLogin: AuthService,
    private spinner: NgxSpinnerService
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
      nombreAdmin: ["", Validators.required],
      apellidoAdmin: ["", Validators.required],
      emailAdmin: ["", Validators.required],
      telefonoAdmin: ["", Validators.required],
      passwordAdmin: ["", Validators.required],
      nombreCompany: ["", Validators.required],
      paisCompany: ["", Validators.required],
      ciudadCompany: ["", Validators.required],
    });

    this.frmLogin = this.formBuilder.group({
      user: ["", Validators.required],
      pwd: ["", Validators.required],
    });

  }

  get f() {
    return this.frmCandidato.controls;
  }

  get fCo() {
    return this.frmCompany.controls;
  }

  get fl() {
    return this.frmLogin.controls;
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
    console.log(this.frmCandidato.value.nombreCandidato);

    console.log(this.f);

    this.submittedCandidato = true;
    if (this.frmCandidato.invalid) {
      return;
    }
    this.spinner.show();
    try {
      const reg = await this.api.registroUsuario(this.f.emailCandidato.value, this.f.passwordCandidato.value, 3, "1234567890", 0);
      console.log(reg);
      if (!reg.p_error_message) {
        const regCandidato = await this.api.registroCandidato(this.f.nombreCandidato.value, this.f.apellidoCandidato.value, this.f.emailCandidato.value, this.f.telefonoCandidato.value, reg.p_id_usuario);
        console.log(regCandidato);
        if (!regCandidato.p_error_message) {
          // Login
          const login = await (await this.apiLogin.login(this.f.emailCandidato.value, this.f.passwordCandidato.value)).subscribe({
            next: (data) => {
              // Redirect to dashboard candidate
              this.spinner.hide();
              this.router.navigate(['/candidates-dashboard']);
            },
            error: (error) => {
              console.error('There was an error!', error);
              this.spinner.hide();
            },
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar el candidato. ' + regCandidato.p_error_message
          });
          this.spinner.hide();
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar el usuario. ' + reg.p_error_message
        });
        this.spinner.hide();
      }

    } catch (error: any) {
      console.log('Error Status: ', error.status);
      this.spinner.hide();
    }
  }

  checkTyCCandidato(event: any) {
    this.checkTerminosCandidato = event.currentTarget.checked;
  }

  checkTyCCompany(event: any) {
    this.checkTerminosCcompany = event.currentTarget.checked;
  }

  async registroCompany() {

    console.log(this.frmCompany.value);

    this.submittedCompany = true;
    if (this.frmCompany.invalid) {
      return;
    }
    this.spinner.show();
    try {
      const regC = await this.api.registroEmpresa(this.frmCompany.value.nombreCompany, this.frmCompany.value.paisCompany, this.frmCompany.value.ciudadCompany, this.frmCompany.value.telefonoAdmin);
      if (!regC.p_error_message) {
        const reg = await this.api.registroUsuario(this.frmCompany.value.emailAdmin, this.frmCompany.value.passwordAdmin, 1, "1234567890", regC.p_id_empresa);
        if (!reg.p_error_message) {
          const regCandidato = await this.api.registroReclutador(
            this.frmCompany.value.nombreAdmin,
            this.frmCompany.value.apellidoAdmin,
            this.frmCompany.value.emailAdmin,
            reg.p_id_usuario,
            regC.p_id_empresa,
            this.frmCompany.value.telefonoAdmin
            );

            console.log(regCandidato);
            if (!regCandidato.p_error_message) {
              // Login
              const login = await (await this.apiLogin.login(this.frmCompany.value.emailAdmin, this.frmCompany.value.passwordAdmin)).subscribe({
                next: (data) => {
                  this.spinner.hide();
                  // Redirect to dashboard
                  this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                  console.error('There was an error!', error);
                  this.spinner.hide();
                },
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al registrar el reclutador. ' + regCandidato.p_error_message
              });
              this.spinner.hide();
            }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar el usuario. ' + reg.p_error_message
          });
          this.spinner.hide();
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar la empresa. ' + regC.p_error_message
        });
        this.spinner.hide();
      }

    } catch (error: any) {
      this.spinner.hide();
      console.log('Error Status: ', error.status);
    }
  }

  async login() {
    console.log('login');
    this.submittedLogin = true;
    if (this.frmLogin.invalid) {
      return;
    }
    this.spinner.show();
    try {
      const login = await (await this.apiLogin.login(this.fl.user.value, this.fl.pwd.value)).subscribe({
        next: (data) => {
          console.log(data);
          if (data.p_id_rol == 3) {
            // Redirect to dashboard candidate
            this.spinner.hide();
            this.router.navigate(['/candidates-dashboard']);
          } else if (data.p_id_rol == 1 || data.p_id_rol == 2) {
            // Redirect to dashboard
            this.spinner.hide();
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          this.spinner.hide();
          console.error('There was an error!', error);
        },
      });
    } catch (error: any) {
      this.spinner.hide();
      console.log('Error Status: ', error.status);
    }
  }

}
