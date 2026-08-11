import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MembersListComponent } from './features/members/members-list/members-list.component';
import { MemberDetailsComponent } from './features/members/member-details/member-details.component';
import { LinksComponent } from './features/links/links.component';
import { MessagesComponent } from './features/messages/messages.component';
import { authGuard } from './core/guards/auth.guard';
import { TestErrorsComponent } from './features/test-errors/test-errors.component';
import { NotFoundComponent } from './shared/errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/errors/server-error/server-error.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'members',
        component: MembersListComponent,
      },
      {
        path: 'members/:id',
        component: MemberDetailsComponent,
      },
      {
        path: 'links',
        component: LinksComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
    ],
  },
  {
    path: 'errors',
    component: TestErrorsComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
  },
  {
    path: '**',
    component: TestErrorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
