import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { PostComponent } from './shared/components/post/post.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { AuthService } from './admin/shared/services/auth.service';
import { QuillModule } from 'ngx-quill'

const INTERCEPTOR_PROVIDER: Provider = {/* интерсепторы регистрируются в app.module */
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

const modulesQuill = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'script': 'sub'}, { 'script': 'super' }],                     
  [{ 'size': ['small', false, 'large', 'huge'] }],  
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],          
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['image']                    
];

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostsPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    QuillModule.forRoot({
      modules: {
        toolbar: modulesQuill
      }
    }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [INTERCEPTOR_PROVIDER, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
