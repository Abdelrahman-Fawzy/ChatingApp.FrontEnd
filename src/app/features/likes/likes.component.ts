import { Component, OnInit } from '@angular/core';
import { LikesService } from 'src/app/core/services/likes.service';
import { LikesParams } from 'src/app/shared/types/likesParams';
import { Member } from 'src/app/shared/types/member';
import { PaginatedResult } from 'src/app/shared/types/paginations';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent implements OnInit {
  protected paginatedResult: PaginatedResult<Member> | null = null;
  protected members: Member[] = [];
  protected likesParams = new LikesParams();
  protected predicate: string = this.likesParams.predicate;

  constructor(private likeService: LikesService) {}

  ngOnInit(): void {
    this.GetMemberLikes();
  }

  tabs = [
    { label: 'Liked', value: 'liked' },
    { label: 'Liked me', value: 'likedBy' },
    { label: 'Mutual', value: 'mutual' },
  ];

  setPredicate(predicate: string) {
    if (this.predicate != predicate) {
      this.predicate = predicate;
      this.likesParams.predicate = predicate;
      this.likesParams.pageNumber = 1;
      this.GetMemberLikes();
    }
  }

  GetMemberLikes() {
    this.likeService.GetMemberLikes(this.likesParams).subscribe({
      next: (members: PaginatedResult<Member>) => {
        this.paginatedResult = members;
        this.members = members.items;
      },
    });
  }

  onPageChange(likesParams: { pageNumber: number; pageSize: number }) {
    this.likesParams.pageNumber = likesParams.pageNumber;
    this.likesParams.pageSize = likesParams.pageSize;
    this.GetMemberLikes();
  }

  trackByMemberId(index: number, member: Member): string {
    return member.id;
  }
}
