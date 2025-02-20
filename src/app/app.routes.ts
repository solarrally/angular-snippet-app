import { Routes } from '@angular/router';
import { LayoutPublicComponent } from './components/layout/layout-public/layout-public.component'
import { LayoutAuthenticatedComponent } from './components/layout/layout-authenticated/layout-authenticated.component'
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ConfirmAccountComponent } from './auth/components/confirm-account/confirm-account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { SetPasswordComponent } from './auth/components/set-password/set-password.component';
import { authGuard } from './auth/guard/auth-guard';
import { TermsComponent } from './pages/common/terms/terms.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SnippetsComponent } from './pages/snippets/snippets.component'
import { ErrorDefaultComponent } from './pages/common/error-default/error-default.component'
import { Error404Component } from './pages/common/error-404/error-404.component'

export const routes: Routes = [
  { 
    path: 'errors',
    children: [
      { path: '', component: ErrorDefaultComponent },
      { path: '404', component: Error404Component }
    ]
  },
  {
    path: '',
    component: LayoutAuthenticatedComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'snippets', component: SnippetsComponent }
    ]
  },
  {
    path: 'auth',
    component: LayoutPublicComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'confirm-account', component: ConfirmAccountComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'set-password', component: SetPasswordComponent },
      { path: 'terms', component: TermsComponent }
    ]
  },
  {
    path: '',
    component: LayoutPublicComponent,
    children: [
      { path: 'terms', component: TermsComponent }
    ]
  },
  { path: '**', redirectTo: '/errors/404'  }
];