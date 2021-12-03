import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
resetModel={
    Email: '',
    UserName: ''
  }

  constructor(private service:UserService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  forgotPassword(form:NgForm) {
      this.service.login(form.value).subscribe(
        (res:any) => {
          localStorage.setItem('token',res.token);
          this.router.navigateByUrl('/user/login');
        },
        err => {
          if(err.status == 400)
            this.toastr.error('Incorrect Username or Email Address.','Password Generation failed');
          else
          console.log(err);
        }
      );
  }

  toLogin(){
    this.router.navigateByUrl('/user/login');
  }

}

