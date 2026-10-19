import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LikesParams } from 'src/app/shared/types/likesParams';
import { Member } from 'src/app/shared/types/member';
import { PaginatedResult } from 'src/app/shared/types/paginations';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private baseUrl = environment.apiUrl;
  public likeIDs: string[] = [];

  constructor(private http: HttpClient) {}

  GetCurrentMemberLikesIDs() {
    return this.http.get<string[]>(`${this.baseUrl}/Likes/list`).subscribe({
      next: (ids) => {
        this.likeIDs = ids;
      },
    });
  }

  GetMemberLikes(likesParams: LikesParams) {
    let params = new HttpParams();

    params = params.append('pageNumber', likesParams.pageNumber);
    params = params.append('pageSize', likesParams.pageSize);
    params = params.append('predicate', likesParams.predicate);

    return this.http.get<PaginatedResult<Member>>(`${this.baseUrl}/Likes`, {
      params,
    });
  }

  ToggleLike(targetMemberID: string) {
    return this.http.post(`${this.baseUrl}/Likes/${targetMemberID}`, {});
  }

  clearLikeIDs() {
    this.likeIDs = [];
  }

  isLiked(memberID: string): boolean {
    return this.likeIDs.includes(memberID);
  }
}
