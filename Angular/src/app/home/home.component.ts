import { Route } from '@angular/compiler/src/core';
import { Component, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  userDetails:any;
  allPosts: any;
  closeResult = '';
  sortBtnValue = 'Sort by Newest';

  constructor(private router:Router, public service:UserService, private modalService: NgbModal, 
    private toastr:ToastrService) { }

  open(content:any) {
    this.modalService.open(content,
   {ariaLabelledBy: 'post'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
        res=> {
          this.userDetails = res;
        },
        err => {
          console.log(err);
        }
      );

    this.service.getAllPosts().subscribe(
      res=> {
        this.allPosts = res;
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

  getProfile() {
    this.router.navigate(['/profile']);
  }

  createPost(){
    this.service.addPost().subscribe(
      (res:any) => {
        if (res.succeeded) {
          this.service.postForm.reset();
          this.router.navigate(['/home']);
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  toggle = true;

  like(id:any){
    // this.service.clickLike().subscribe(
    //   res => {
    //     if(res)
    //     this.toastr.success('Liked a comment.', 'Like');
    //   }, 
    //   err => {
    //     console.log(err);
    //   }
    // )
    this.toggle = !this.toggle;
    this.allPosts.find((e:any) => e.postId === id).status = this.toggle ? 'Like' : 'Unike';
  }

  order = false;

  sort(){
    if(this.order) {
      let newpost = this.allPosts.sort((a:any, b:any) => a.postId - b.postId);
      this.allPosts = newpost;
      if(this.sortBtnValue == 'Sort by Oldest') {
        this.sortBtnValue = 'Sort by Newest';
        this.order = !this.order;
      }
    }
    else {
      let newpost = this.allPosts.sort((a:any, b:any) => b.postId - a.postId);
      this.allPosts = newpost;
      if(this.sortBtnValue == 'Sort by Newest') {
        this.sortBtnValue = 'Sort by Oldest';
        this.order = !this.order;
      }
    }
  }
}
