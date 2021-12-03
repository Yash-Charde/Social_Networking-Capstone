import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path:'', redirectTo:'/user/login',pathMatch:'full'},
  {
    path:'user', component: UserComponent,
    children:[
      { path:'registration', component: RegistrationComponent},
      { path:'login', component: LoginComponent}
    ]
  },
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'profile', component:ProfileComponent},
  { path:'reset-password', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
