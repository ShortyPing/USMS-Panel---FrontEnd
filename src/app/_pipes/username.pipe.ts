import { Pipe, PipeTransform } from '@angular/core';
import {AuthService} from "../_services/auth/auth.service";
import {map, Observable} from "rxjs";

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {

  constructor(private authService: AuthService) {
  }

  transform(value: string, ...args: unknown[]): Observable<any> {
    return this.authService.getUsernameById(value).pipe(
      map(x => x["username"])
    );
  }

}
