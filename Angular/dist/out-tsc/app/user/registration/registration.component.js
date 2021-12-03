import { __decorate } from "tslib";
import { Component } from '@angular/core';
let RegistrationComponent = class RegistrationComponent {
    constructor(service, toastr, router) {
        this.service = service;
        this.toastr = toastr;
        this.router = router;
    }
    ngOnInit() {
        this.service.formModel.reset();
        if (localStorage.getItem('token') != null)
            this.router.navigateByUrl('/home');
    }
    onSubmit() {
        this.service.register().subscribe((res) => {
            if (res.succeeded) {
                this.service.formModel.reset();
                this.toastr.success('New User created.', 'Regitration successful');
                this.router.navigate(['/user/login']);
            }
            else {
                res.errors.forEach((element) => {
                    switch (element.code) {
                        case "DuplicateUserName":
                            this.toastr.error('Username is taken.', 'Regitration failed');
                            break;
                        case "PasswordRequiresNonAlphanumeric":
                            this.toastr.error('Must include atleast one special character.', 'Regitration failed');
                            break;
                        case "PasswordRequiresDigit":
                            this.toastr.error('Must include atleast one digit.', 'Regitration failed');
                            break;
                        case "PasswordRequiresLower":
                            this.toastr.error('Must include atleast one lowercase alphabet.', 'Regitration failed');
                            break;
                        case "PasswordRequiresUpper":
                            this.toastr.error('Must include atleast one uppercase alphabet.', 'Regitration failed');
                            break;
                        default:
                            this.toastr.error(element.description, 'Regitration failed');
                            break;
                    }
                });
            }
        }, err => {
            console.log(err);
        });
    }
};
RegistrationComponent = __decorate([
    Component({
        selector: 'app-registration',
        templateUrl: './registration.component.html',
        styles: []
    })
], RegistrationComponent);
export { RegistrationComponent };
//# sourceMappingURL=registration.component.js.map