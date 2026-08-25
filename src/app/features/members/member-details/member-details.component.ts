import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Member } from 'src/app/shared/types/member';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnInit {
  member: Member = {} as Member;
  title: string | undefined = 'Profile';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data: any) => {
        this.member = data.member;
      },
    });

    this.setTitle();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: () => {
          this.setTitle();
        },
      });
  }

  private setTitle() {
    this.title = this.activatedRoute.firstChild?.snapshot.title;
  }
}
