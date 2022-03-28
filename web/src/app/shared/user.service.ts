import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceBase } from 'src/app/shared/base.service';
import { User } from 'src/app/shared/user.model';

@Injectable()
export class UserService extends HttpServiceBase {

  protected apiUrl(...parts: string[]): string {
    return super.apiUrl('api/users', ...parts);
  }

  getCurrent(): Observable<User> {
    const url = this.apiUrl('current');
    return this.httpClient.get<User>(url);
  }

}
