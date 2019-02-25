import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { RequestAccessService } from './request-access.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css']
})
export class RequestAccessComponent implements OnInit {

  user: User = new User();
  loading: boolean = false;
  formValid = false;
  
  constructor(
    private router: Router,
    private requestAccessService: RequestAccessService,
  ) { }

  ngOnInit() {
  }

  validateInput(event){
    let firstName, lastName, email;
    let elements = document.getElementsByTagName("input");
    
    for (let i = 0; i < elements.length; i++) {
      if(elements[i].name === 'lastName'){
        if(elements[i].value !== ''){
          lastName = true;
        }else{
          lastName = false;
        }
      }else if( elements[i].name === 'firstName'){
        if(elements[i].value !== ''){
          firstName = true;
        }else{
          firstName = false;
        }
      }else if( elements[i].name === 'email'){
        if(elements[i].value !== ''  && (elements[i].value.includes('@') && elements[i].value.includes('bosch.com'))){
          email = true;
        }else{
          email = false;
        }
      }
    }
    
    if(firstName && lastName && email){
      this.formValid = true;
    }else{
      this.formValid = false;
    }
  }

  requestAccess(){
    this.loading = true;

    this.requestAccessService.requestAccess(this.user).subscribe(
      (data: HttpResponse< {status: string} >) => {
        try{
          if(data.body.status === 'Registered'){
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
