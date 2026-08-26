import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';
import { MemberService } from 'src/app/core/services/member.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { EditableMember, Member } from 'src/app/shared/types/member';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss'],
})
export class MemberProfileComponent implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm!: NgForm;

  protected editableMember: EditableMember = {
    displayName: '',
    description: '',
    country: '',
    city: '',
  };

  constructor(
    protected memberService: MemberService,
    protected accountService: AccountService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.editableMember = {
      displayName: this.memberService.member()?.displayName ?? '',
      description: this.memberService.member()?.description ?? '',
      country: this.memberService.member()?.country ?? '',
      city: this.memberService.member()?.city ?? '',
    };
  }

  ngOnDestroy(): void {
    if (this.editForm?.dirty) {
      this.memberService.editMode.set(false);
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  notify($event: BeforeUnloadEvent) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }

  updateProfile() {
    if (!this.memberService.member()) return;

    const updateMember = {
      ...this.memberService.member(),
      ...this.editableMember,
    } as Member;

    this.memberService.updateMember(updateMember).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();
        if (
          currentUser &&
          updateMember.displayName !== currentUser.displayName
        ) {
          currentUser.displayName = updateMember.displayName;
          this.accountService.setCurrentUser(currentUser);
        }
        this.memberService.editMode.set(false);
        this.memberService.member.set(updateMember);
        this.toastr.success('تم التعديل بنجاح');
        this.editForm.reset(updateMember);
      },
    });
  }
}
