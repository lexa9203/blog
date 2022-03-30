import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IAdmin from 'src/app/shared/interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @ViewChild("inputPassword") PasswordRef!: ElementRef;

  form!: FormGroup

  hide = true

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    const admin: IAdmin = {
      email: this.form.value.email,
      password: this.form.value.password
    }    

    this.form.reset()
  }

  showPassword() {
    if(this.hide) {
      this.PasswordRef.nativeElement.setAttribute('type', 'text')
      this.hide = false
    } else {
      this.PasswordRef.nativeElement.setAttribute('type', 'password')
      this.hide = true
    }
  }

}

