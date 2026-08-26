import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { EditableMember, Member, Photo } from 'src/app/shared/types/member';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl = environment.apiUrl;
  editMode = signal<boolean>(false);
  member = signal<Member | null>(null);

  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}/Members`);
  }

  getMember(id: string) {
    return this.http
      .get<Member>(`${this.baseUrl}/Members/${id}`)
      .pipe(tap((member: Member) => this.member.set(member)));
  }

  getMemberPhotos(id: string) {
    return this.http.get<Photo[]>(`${this.baseUrl}/Members/${id}/photos`);
  }

  updateMember(member: EditableMember) {
    return this.http.put(`${this.baseUrl}/Members`, member);
  }
}
