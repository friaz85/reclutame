import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';
import { ReclutameService } from 'src/services/reclutame.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ed-change-password',
  templateUrl: './ed-change-password.component.html',
  styleUrls: ['./ed-change-password.component.scss']
})
export class EdChangePasswordComponent {

  frm: FormGroup | any;
  submitted = false;

  constructor(
    private api: ReclutameService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) {

  }

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      password: ["", Validators.required],
      new_password: ["", Validators.required],
    });
  }

  get f() {
    return this.frm.controls;
  }

  updatePassword() {
    this.submitted = true;
    if (this.frm.invalid) {
      return;
    }

    if (this.f.password.value != this.f.new_password.value) {
      Swal.fire({
        icon: "error",
        title: "Error updating password",
        text: "Passwords do not match",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    this.spinner.show();
    this.api
      .updatePassword(
        this.auth.currentUserValue.p_id_usuario,
        this.f.password.value,
      )
      .then((resp: any) => {
        this.spinner.hide();
        this.frm.reset();
        Swal.fire({
          icon: "success",
          title: "Updated password",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err: any) => {
        this.spinner.hide();
        this.frm.reset();
        Swal.fire({
          icon: "error",
          title: "Error updating password",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }
}
