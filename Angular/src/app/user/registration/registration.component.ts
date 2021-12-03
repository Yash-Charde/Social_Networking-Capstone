import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr:ToastrService, private router:Router) { }

  ngOnInit() {
    this.service.formModel.reset();
    if(localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  onSubmit() {
    this.service.register().subscribe(
      (res:any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New User created.', 'Regitration successful');
          this.router.navigate(['/user/login']);
        } else {
          res.errors.forEach((element:any) => {
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
      },
      err => {
        console.log(err);
      }
    )
  }

}
