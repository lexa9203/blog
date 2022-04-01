import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAdmin } from 'src/app/shared/interface';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @ViewChild("inputPassword") PasswordRef!: ElementRef;
    
  form!: FormGroup

  hide = true

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    const admin: IAdmin = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true                 //это свойство нужно, чтобы получать от firebase время окончания жизни токена
    }  
    
    this.auth.login(admin).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
    })
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

