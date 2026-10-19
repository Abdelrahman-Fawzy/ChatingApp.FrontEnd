import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './core/services/account.service';
import { Router } from '@angular/router';
import { InitService } from './core/services/init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users: any;

  constructor(
    protected router: Router,
    protected initService: InitService,
  ) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    this.initService.init();
  }
}
