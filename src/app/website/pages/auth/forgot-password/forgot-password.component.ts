import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public visible = false;
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  ngOnInit(): void {
  }

  forgotForm = new FormGroup({
    identity: new FormControl('', Validators.required),
  })

  forgotPassword() {
    var formData: any = new FormData();
    formData.append("identity", this.forgotForm.get("identity")?.value);

    if (this.forgotForm.valid) {
      this.authService.forgot(formData)


    } else {
      this.errorMessage = 'Porfavor rellena todos los campos obligatorios.';
      this.errorClass = "errorMessage";
    }
  }
}
