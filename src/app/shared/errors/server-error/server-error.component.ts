import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIError } from '../../types/error';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss'],
})
export class ServerErrorComponent implements OnInit {
  protected router = inject(Router);
  protected error: APIError | undefined;
  protected showDetails: boolean = false;

  ngOnInit(): void {
    const navigation = this.router.lastSuccessfulNavigation;
    this.error = navigation?.extras.state?.['error'];
  }

  toggleErrorDetails() {
    this.showDetails = !this.showDetails;
  }
}
