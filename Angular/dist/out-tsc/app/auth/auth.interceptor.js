import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
let AuthInterceptor = class AuthInterceptor {
    constructor(router) {
        this.router = router;
    }
    intercept(req, next) {
        if (localStorage.getItem('token') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer' + localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(tap(succ => { }, err => {
                if (err.status == 401) {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('/user/login');
                }
            }));
        }
        else {
            return next.handle(req.clone());
        }
    }
};
AuthInterceptor = __decorate([
    Injectable()
], AuthInterceptor);
export { AuthInterceptor };
//# sourceMappingURL=auth.interceptor.js.map