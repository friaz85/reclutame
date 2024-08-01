import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "src/services/auth.service";


@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("AuthGuard#canActivate called");
    const currentUser = this.authenticationService.currentUserValue;
    // console.log(currentUser);
    if (currentUser) {
      // authorised so return true
      if ((currentUser.p_id_rol == 1 || currentUser.p_id_rol == 2) && state.url == "/dashboard") {
        return true;
      } else if (currentUser.p_id_rol == 3 && state.url == "/candidates-dashboard") {
        return true;
      } else {
        return false;
      }
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(["./"]);
      //   this.router.navigate(['./login/'], {
      //   queryParams: { returnUrl: state.url },
      // });
    }

    return false;
  }
}
