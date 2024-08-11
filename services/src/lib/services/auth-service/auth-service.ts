import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({providedIn:"root"})
export class AuthService {

  /**
   *
   */
  constructor(private _cookieService: CookieService) {
    
  }
  IsAuthorize(){
    const token = this._cookieService.get("access-token");
    const isGuest = this._cookieService.get("user-guest");
    return !!token || isGuest;
  }
}