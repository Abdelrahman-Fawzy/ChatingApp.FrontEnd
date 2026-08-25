import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member, Photo } from 'src/app/shared/types/member';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}/Members`);
  }

  getMember(id: string) {
    return this.http.get<Member>(`${this.baseUrl}/Members/${id}`);
  }

  getMemberPhotos(id: string) {
    return this.http.get<Photo[]>(`${this.baseUrl}/Members/${id}/photos`);
  }
}
