import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  checkoutForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder
    , private usuarioServ: UsuarioService
    , private router: Router) {
    this.checkoutForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(10)]],
        email: ['', [Validators.required, Validators.email]],
        contra: ['', [Validators.required, Validators.minLength(6)]],
        confirmar_contra: ['', [Validators.required]]
      },
      { validators: this.comprobarContras }
    );
  }

  comprobarContras(form: AbstractControl) {
    const password = form.get('contra')?.value;
    const confirm = form.get('confirmar_contra')?.value;

    if (password !== confirm) {
      form.get('confirmar_contra')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmar_contra')?.setErrors(null);
    }

    return null;
  }

  onSubmit() {
    this.submitted = true;

    if (this.checkoutForm.invalid) {
      return;
    }

    const { nombre, email, contra } = this.checkoutForm.value;

    const nuevoUsuario = {
      nombre,
      email,
      contraseña: contra
    };

    this.usuarioServ.create(nuevoUsuario).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
        
        if (err.status === 400 && err.error?.message === 'El email ya está en uso') {
          this.checkoutForm.get('email')?.setErrors({ emailDuplicado: true });
        }
      }
    });
  }

}
