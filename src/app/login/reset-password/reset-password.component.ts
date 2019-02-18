import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css',
  ]
})
export class ResetPasswordComponent implements OnInit {
  user: User = new User();
  loading: boolean = false;
  formValid: boolean = false;

  constructor(
    private router: Router,
    private resetPasswordService: ResetPasswordService
  ) { }

  ngOnInit() {
  }

  validateInput(event){
    let emptyValues = false;
    let elements = document.getElementsByTagName("input");
    
    for (let i = 0; i < elements.length; i++) {
      if(elements[i].value === undefined || elements[i].value === ''){
        emptyValues = true;
      }
    }

    if(elements[1].value !== elements[2].value){
      emptyValues = true;
      //Password not match
    }
    // else if(elements[0].value === 'regex'){
    //   emptyValues = true;
    //   //Email format
    // }

    if(!emptyValues){
      this.formValid = true;
    }else{
      this.formValid = false;
    }
  }

  resetPassword(){
    this.loading = true;

    this.resetPasswordService.resetPassword(this.user).subscribe(
      (data: HttpResponse< {status: string} >) => {
        try{
          if(data.body.status === 'Password changed'){
            this.loading = false;
            this.router.navigate(["/login"])
          }
        }catch (error) {
          console.log('No logrado')
        }  
      },
      error => {
        this.loading = false;
      }
    );
  }
}
