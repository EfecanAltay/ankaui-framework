import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth-service/auth-service";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: "root" })
class UserToken { }

@Injectable({ providedIn: "root" })
class Permissions {
  constructor(
    private currentUser: UserToken,
    private router: Router
  ) { }
  canActivate(id: number): boolean {
    return true;
  }
}

@Injectable({ providedIn: "root" })
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private permissions: Permissions,
    private currentUser: UserToken,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.IsAuthorize()) {
      // redirect to some view explaining what happened
      this.router.navigateByUrl('/login');
      return false;
    } else {
      if(!this.permissions.canActivate(route.params['id']))
      {
        this.router.navigateByUrl('/not-found');
        return false;
      }
      return true;
    }
  }
}