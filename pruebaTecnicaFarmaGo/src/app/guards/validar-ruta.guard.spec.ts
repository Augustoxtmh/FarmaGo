import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validarRutaGuard } from './validar-ruta.guard';

describe('validarRutaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validarRutaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
