import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
  //{ path: 'login', loadChildren: '.pages/login/login.module#LoginPageModule' },
  //{ path: 'register', loadChildren: '.pages/register/register.module#RegisterPageModule' },
  { path: '', loadChildren: './pages/menu/menu.module#MenuPageModule'},
  //{ path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  //{ path: 'home/:id', loadChildren: '../home/home.module#HomePageModule' }
  { path: 'form', loadChildren: './pages/form/form.module#FormPageModule'}
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
