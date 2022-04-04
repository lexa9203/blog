import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AdminRoutingModule } from './shared/services/admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth.guard';
import { SearchPipe } from './shared/pipes/search.pipe';
import { QuillModule } from 'ngx-quill'
import { TextPipe } from './shared/pipes/text.pipe';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    CreatePageComponent,
    DashboardPageComponent,
    EditPageComponent,
    SearchPipe,
    TextPipe
  ],
  imports: [
    QuillModule.forRoot(),
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [AdminRoutingModule],
  providers: [AuthService, AuthGuard]

})
export class AdminModule { }
