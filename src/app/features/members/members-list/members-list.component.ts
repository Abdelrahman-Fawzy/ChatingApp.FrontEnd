import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/core/services/member.service';
import { Member } from 'src/app/shared/types/member';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
})
export class MembersListComponent implements OnInit {
  protected members: Member[] = [];

  constructor(private membersService: MemberService) {}

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    this.membersService.getMembers().subscribe({
      next: (members: Member[]) => {
        this.members = members;
      },
    });
  }

  trackByMemberId(index: number, member: Member): string {
    return member.id;
  }
}
