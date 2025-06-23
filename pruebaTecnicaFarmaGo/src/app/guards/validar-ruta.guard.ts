import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const validarRutaGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token && token !== '') {
    return true;
  }

  return router.parseUrl('/login');
};
