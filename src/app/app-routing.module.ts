import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    //{path: '', redirectTo: '/', pathMatch: 'full'},                       пока и так все корректно работает
    {path: '', component: HomePageComponent},
    {path: 'posts/:id', component: PostsPageComponent}    
  ]},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule )},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
