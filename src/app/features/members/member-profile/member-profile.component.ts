import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/core/services/member.service';
import { Member } from 'src/app/shared/types/member';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss'],
})
export class MemberProfileComponent implements OnInit {
  member: Member = {} as Member;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.parent?.data.subscribe((data) => {
      this.member = data['member'];
    });
  }
}
