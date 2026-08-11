import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavComponent } from './layout/nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './features/home/home.component';
import { RegisterComponent } from './features/account/register/register.component';
import { MembersListComponent } from './features/members/members-list/members-list.component';
import { MemberDetailsComponent } from './features/members/member-details/member-details.component';
import { LinksComponent } from './features/links/links.component';
import { MessagesComponent } from './features/messages/messages.component';
import { TestErrorsComponent } from './features/test-errors/test-errors.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NotFoundComponent } from './shared/errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/errors/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MembersListComponent,
    MemberDetailsComponent,
    LinksComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
