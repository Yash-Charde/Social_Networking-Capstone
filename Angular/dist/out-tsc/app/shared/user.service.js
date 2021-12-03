import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { HttpHeaders } from "@angular/common/http";
let UserService = class UserService {
    constructor(fb, http, router) {
        this.fb = fb;
        this.http = http;
        this.router = router;
        this.BaseURI = 'http://localhost:21595/api';
        this.formModel = this.fb.group({
            UserName: ['', Validators.required],
            Email: ['', [Validators.required, Validators.email]],
            FullName: ['', Validators.required],
            Passwords: this.fb.group({
                Password: ['', [Validators.required, Validators.minLength(8)]],
                ConfirmPassword: ['', Validators.required]
            }, { validators: this.comparePasswords })
        });
        this.postForm = this.fb.group({
            Text: ['']
        });
        this.likeForm = this.fb.group({
            Status: ['']
        });
    }
    comparePasswords(fb) {
        var _a;
        let confirmPassword = fb.get('ConfirmPassword');
        if ((confirmPassword === null || confirmPassword === void 0 ? void 0 : confirmPassword.errors) == null || 'passwordMismatch' in confirmPassword.errors) {
            if (((_a = fb.get('Password')) === null || _a === void 0 ? void 0 : _a.value) != (confirmPassword === null || confirmPassword === void 0 ? void 0 : confirmPassword.value))
                confirmPassword === null || confirmPassword === void 0 ? void 0 : confirmPassword.setErrors({ passwordMismatch: true });
            else
                confirmPassword === null || confirmPassword === void 0 ? void 0 : confirmPassword.setErrors(null);
        }
    }
    register() {
        var body = {
            UserName: this.formModel.value.UserName,
            Email: this.formModel.value.Email,
            FullName: this.formModel.value.FullName,
            Password: this.formModel.value.Passwords.Password
        };
        return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
    }
    login(formData) {
        return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
    }
    getUserProfile() {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        return this.http.get(this.BaseURI + '/UserProfile', { headers: tokenHeader });
    }
    getAllPosts() {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        return this.http.get(this.BaseURI + '/Post', { headers: tokenHeader });
    }
    addPost() {
        var post = {
            Text: this.postForm.value.Text
        };
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        return this.http.post(this.BaseURI + '/Post', post, { headers: tokenHeader });
    }
    clickLike() {
        var body = {
            Status: this.postForm.value.Status
        };
        return this.http.patch(this.BaseURI + '/Like', body);
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map