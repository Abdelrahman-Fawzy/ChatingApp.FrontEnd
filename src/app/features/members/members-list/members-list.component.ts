import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from 'src/app/core/services/member.service';
import { ModalFilterComponent } from 'src/app/shared/components/modal-filter/modal-filter.component';
import { Member } from 'src/app/shared/types/member';
import {
  MemberParams,
  PaginatedResult,
  PagingParams,
} from 'src/app/shared/types/paginations';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
})
export class MembersListComponent implements OnInit {
  protected members: Member[] = [];
  protected paginatedResult: PaginatedResult<Member> | null = null;

  protected memberParams: MemberParams = new MemberParams();

  @ViewChild('filterModal') filterModal!: ModalFilterComponent;

  constructor(private membersService: MemberService) {}

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    this.membersService.getMembers(this.memberParams).subscribe({
      next: (members: PaginatedResult<Member>) => {
        this.paginatedResult = members;
        this.members = members.items;
      },
    });
  }

  onPageChange(memberParams: { pageNumber: number; pageSize: number }) {
    this.memberParams.pageNumber = memberParams.pageNumber;
    this.memberParams.pageSize = memberParams.pageSize;
    this.getMembers();
  }

  trackByMemberId(index: number, member: Member): string {
    return member.id;
  }

  openModal() {
    this.filterModal.openModal();
  }

  onClose() {
    this.filterModal.onCloseModal();
  }

  onFilterChange(memberParams: MemberParams) {
    this.memberParams = memberParams;
    this.getMembers();
  }

  resetFilters() {
    this.memberParams = new MemberParams();
    this.getMembers();
  }
}
