import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { MemberService } from 'src/app/core/services/member.service';
import { Member } from 'src/app/shared/types/member';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnInit {
  member: Member = {} as Member;
  title: string | undefined = 'Profile';
  isCurrentUser: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    protected memberService: MemberService,
  ) {
    this.isCurrentUser =
      this.accountService.currentUser()?.id ===
      this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
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
