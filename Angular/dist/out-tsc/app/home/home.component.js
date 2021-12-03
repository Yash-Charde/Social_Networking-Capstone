import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
let HomeComponent = class HomeComponent {
    constructor(router, service, modalService, toastr) {
        this.router = router;
        this.service = service;
        this.modalService = modalService;
        this.toastr = toastr;
        this.closeResult = '';
        this.sortBtnValue = 'Sort by Newest';
        this.toggle = true;
        this.order = false;
    }
    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'post' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult =
                `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    getDismissReason(reason) {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return `with: ${reason}`;
        }
    }
    ngOnInit() {
        this.service.getUserProfile().subscribe(res => {
            this.userDetails = res;
        }, err => {
            console.log(err);
        });
        this.service.getAllPosts().subscribe(res => {
            this.allPosts = res;
        }, err => {
            console.log(err);
        });
    }
    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/user/login']);
    }
    getProfile() {
        this.router.navigate(['/profile']);
    }
    createPost() {
        this.service.addPost().subscribe((res) => {
            if (res.succeeded) {
                this.service.postForm.reset();
                this.router.navigate(['/home']);
            }
        }, err => {
            console.log(err);
        });
    }
    like(id) {
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
        this.allPosts.find((e) => e.postId === id).status = this.toggle ? 'Like' : 'Unike';
    }
    sort() {
        if (this.order) {
            let newpost = this.allPosts.sort((a, b) => a.postId - b.postId);
            this.allPosts = newpost;
            if (this.sortBtnValue == 'Sort by Oldest') {
                this.sortBtnValue = 'Sort by Newest';
                this.order = !this.order;
            }
        }
        else {
            let newpost = this.allPosts.sort((a, b) => b.postId - a.postId);
            this.allPosts = newpost;
            if (this.sortBtnValue == 'Sort by Newest') {
                this.sortBtnValue = 'Sort by Oldest';
                this.order = !this.order;
            }
        }
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map