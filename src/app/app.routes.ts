import { Routes } from '@angular/router';
import { MainContentComponent } from './layout/main-content/main-content.component';
import { roleGuard } from './core/guard/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "login", loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent), title: 'Login' },
  { path: "signup", loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent), title: 'Sign Up' },
  {
    path: '', component: MainContentComponent, children: [
      {
        path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
        title: 'Home', canActivate: [roleGuard], data: { roles: ['Admin', 'User'] }
      },
      {
        path: 'users', loadComponent: () => import('./components/users/users.component').then(m => m.UsersComponent),
        title: 'Users', canActivate: [roleGuard], data: { roles: ['Admin'] }
      },
      {
        path: 'unauthorized',
        loadComponent: () => import('./components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
      }
    ]
  }
];
