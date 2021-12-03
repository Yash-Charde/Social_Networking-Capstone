import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProfileComponent = class ProfileComponent {
    constructor(service, router) {
        this.service = service;
        this.router = router;
    }
    ngOnInit() {
        this.service.getUserProfile().subscribe(res => {
            this.userDetails = res;
        }, err => {
            console.log(err);
        });
    }
    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/user/login']);
    }
};
ProfileComponent = __decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
    })
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map