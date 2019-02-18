import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  loading: boolean = false;
  formValid = false;

  constructor(
    private router: Router,
    private registerService: RegisterService
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

    if(!emptyValues){
      this.formValid = true;
    }else{
      this.formValid = false;
    }
  }

  register(){
    this.loading = true;

    this.registerService.register(this.user).subscribe(
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
