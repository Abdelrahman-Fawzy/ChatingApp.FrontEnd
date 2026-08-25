import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/core/services/member.service';
import { Photo } from 'src/app/shared/types/member';

@Component({
  selector: 'app-member-photos',
  templateUrl: './member-photos.component.html',
  styleUrls: ['./member-photos.component.scss'],
})
export class MemberPhotosComponent implements OnInit {
  photos: Photo[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
  ) {}

  ngOnInit(): void {
    const memberId = this.activatedRoute.parent?.snapshot.paramMap.get('id');
    if (memberId) {
      this.getPhotos(memberId);
    }
  }

  private getPhotos(id: string) {
    this.memberService.getMemberPhotos(id).subscribe({
      next: (photos: Photo[]) => (this.photos = photos),
    });
  }

  trackByPhotoId(index: number, photo: Photo): number {
    return photo.id;
  }
}
