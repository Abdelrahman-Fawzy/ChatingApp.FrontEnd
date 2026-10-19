import { Component, Input, OnInit } from '@angular/core';
import { LikesService } from 'src/app/core/services/likes.service';
import { Member } from 'src/app/shared/types/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {
  @Input({ required: true }) member!: Member;
  protected isLiked?: boolean;

  constructor(private likesService: LikesService) {}

  ngOnInit(): void {
    this.isLiked = this.likesService.isLiked(this.member?.id);
  }

  toggleLike(event: Event) {
    event.stopPropagation();
    this.likesService.ToggleLike(this.member.id).subscribe({
      next: () => {
        this.isLiked = !this.isLiked;
        if (this.isLiked) {
          this.likesService.likeIDs.push(this.member.id);
        } else {
          const index = this.likesService.likeIDs.indexOf(this.member.id);
          if (index > -1) {
            this.likesService.likeIDs.splice(index, 1);
          }
        }
      },
    });
  }
}
