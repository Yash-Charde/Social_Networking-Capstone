import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient, private router:Router) { }

  readonly BaseURI = 'http://localhost:21595/api'

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    FullName: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(8)]],
      ConfirmPassword: ['', Validators.required]
    },{validators: this.comparePasswords })
  });

  postForm = this.fb.group({
    Text: ['']
  });

  likeForm = this.fb.group({
    Status: ['']
  })

  comparePasswords(fb:FormGroup) {
    let confirmPassword = fb.get('ConfirmPassword');
    if(confirmPassword?.errors == null || 'passwordMismatch' in confirmPassword.errors) {
      if(fb.get('Password')?.value != confirmPassword?.value)
        confirmPassword?.setErrors({passwordMismatch: true});
      else
      confirmPassword?.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI+'/ApplicationUser/Register', body);
  }

  login(formData:any) {
    return this.http.post(this.BaseURI+'/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'/UserProfile',{headers : tokenHeader});
  }

  getAllPosts(){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI+'/Post',{headers : tokenHeader});
  }

  addPost() {
    var post = {
      Text: this.postForm.value.Text
    };
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.post(this.BaseURI+'/Post', post, {headers : tokenHeader});
  }

  clickLike(){
    var body = {
      Status: this.postForm.value.Status
    } 
    return this.http.patch(this.BaseURI+'/Like', body);
  }
}
 