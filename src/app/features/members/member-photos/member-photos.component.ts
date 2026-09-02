import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';
import { MemberService } from 'src/app/core/services/member.service';
import { Member, Photo } from 'src/app/shared/types/member';

@Component({
  selector: 'app-member-photos',
  templateUrl: './member-photos.component.html',
  styleUrls: ['./member-photos.component.scss'],
})
export class MemberPhotosComponent implements OnInit {
  photos: Photo[] = [];
  loading = signal<boolean>(false);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    protected memberService: MemberService,
    protected accountService: AccountService,
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

  onUploadImage(file: File) {
    this.loading.set(true);
    this.memberService.uploadPhoto(file).subscribe({
      next: (photo: Photo) => {
        this.loading.set(false);
        this.memberService.editMode.set(false);
        this.photos = [...this.photos, photo];
        if (!this.memberService.member()?.imageUrl)
          this.setLocalPhotoAsMain(photo);
      },
      error: (error) => {
        console.log('Error uploading image: ', error);
        this.loading.set(false);
      },
    });
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: () => {
        this.setLocalPhotoAsMain(photo);
      },
    });
  }

  setLocalPhotoAsMain(photo: Photo) {
    const currentUser = this.accountService.currentUser();
    if (currentUser) currentUser.imageURL = photo.url;
    this.accountService.setCurrentUser(currentUser);
    this.memberService.member.update(
      (member) =>
        ({
          ...member,
          imageUrl: photo.url,
        }) as Member,
    );
  }

  deletePhoto(photo: Photo) {
    this.memberService.deletePhoto(photo.id).subscribe({
      next: () => {
        const photoIndex = this.photos.indexOf(photo);
        this.photos.splice(photoIndex, 1);
      },
    });
  }
}
