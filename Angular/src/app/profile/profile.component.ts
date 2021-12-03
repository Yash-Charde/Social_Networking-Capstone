import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails:any;

  constructor(private service:UserService, private router: Router) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res=> {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
