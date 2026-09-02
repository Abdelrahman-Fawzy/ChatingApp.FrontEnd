import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavComponent } from './layout/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { MemberCardComponent } from './features/members/member-card/member-card.component';
import { AgePipe } from './shared/pipes/age.pipe';
import { MemberProfileComponent } from './features/members/member-profile/member-profile.component';
import { MemberPhotosComponent } from './features/members/member-photos/member-photos.component';
import { MemberMessagesComponent } from './features/members/member-messages/member-messages.component';
import { DatePipe } from '@angular/common';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { ImageUploadComponent } from './shared/components/image-upload/image-upload.component';
import { StarButtonComponent } from './shared/components/star-button/star-button.component';
import { DeleteButtonComponent } from './shared/components/delete-button/delete-button.component';
import { InputTextComponent } from './shared/components/input-text/input-text.component';

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
    MemberCardComponent,
    AgePipe,
    MemberProfileComponent,
    MemberPhotosComponent,
    MemberMessagesComponent,
    ImageUploadComponent,
    StarButtonComponent,
    DeleteButtonComponent,
    InputTextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
