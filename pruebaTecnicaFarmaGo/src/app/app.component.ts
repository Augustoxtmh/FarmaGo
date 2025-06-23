import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pruebaTecnicaFarmaGo';
  valid = false;

  constructor(
    private authServ: AuthService,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const t = localStorage.getItem('token');
        this.valid =
          t !== '' &&
          t !== null &&
          !this.router.url.startsWith('/login') &&
          !this.router.url.startsWith('/registrarse');
      });
  }

  cerrarSes(event: Event) {
    event.preventDefault();
    this.authServ.logout();
    this.router.navigate(['/login']);
  }
}
