import { Component, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnChanges {
  checkoutForm: FormGroup;
  int_res = 3;
  error_login = false;

  constructor(
    private fb: FormBuilder,
    private authServ: AuthService,
    private router: Router
  )
  {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required]],
      contra: ['', [Validators.required]]
    });
  }

  ngOnChanges(): void {
    if(this.error_login)
      this.error_login = false;
  }

  ngOnInit(): void {
    const int_prev = localStorage.getItem('int_res');
    this.int_res = int_prev !== null ? Number(int_prev) : 3;
  }

  onSubmit() {
    if (this.int_res > 0) {
      const { email, contra } = this.checkoutForm.value;

      this.authServ.login(email, contra).subscribe({
        next: (res) => {
          if (res) {
            this.authServ.guardarToken(res);
            this.router.navigate(['/dashboard']);
          } else {
            this.falloAlIntentar();
          }
        },
        error: (err) => {
          if (err.status === 401) {
            this.error_login = true;
            this.falloAlIntentar();
          } else {
            console.error('Error inesperado:', err);
          }
        }
      });
    } else {
      this.error_login = true;
    }
  }

  falloAlIntentar() {
    this.error_login = true;
    this.int_res--;
    localStorage.setItem('int_res', this.int_res.toString());
  }

  desactivarBloqueo() {
    this.error_login = false;
    this.int_res = 3;
    localStorage.setItem('int_res', this.int_res.toString());
  }
}
