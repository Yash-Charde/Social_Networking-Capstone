import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(service, router, toastr) {
        this.service = service;
        this.router = router;
        this.toastr = toastr;
        this.formModel = {
            UserName: '',
            Password: ''
        };
    }
    ngOnInit() {
        if (localStorage.getItem('token') != null)
            this.router.navigateByUrl('/home');
    }
    forgotPassword() {
        this.router.navigateByUrl('/reset-password');
    }
    onSubmit(form) {
        this.service.login(form.value).subscribe((res) => {
            localStorage.setItem('token', res.token);
            this.router.navigateByUrl('/home');
        }, err => {
            if (err.status == 400)
                this.toastr.error('Incorrect Username or Password.', 'Authentication failed');
            else
                console.log(err);
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styles: []
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map