import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { UserAdminComponent } from './main/user-admin/user-admin.component';
import { validarRutaGuard } from './guards/validar-ruta.guard';

const routes: Routes = [{path: '', redirectTo: 'login', pathMatch: 'full'},
                        {path: 'login', component: LoginComponent},
                        {path: 'registrarse', component: RegisterComponent},
                        {path: 'dashboard', component: DashboardComponent, canActivate: [validarRutaGuard]},
                        {path: 'users', component: UserAdminComponent, canActivate: [validarRutaGuard]},
                        {path: '**', redirectTo: 'login'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
