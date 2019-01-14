import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { WorkStation } from '../../models/workstation.model';
import { CallOut} from './../../../utilities/callout';

@Component({
  selector: 'app-add-workstation',
  templateUrl: './add-workstation.component.html',
  styleUrls: ['./add-workstation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddWorkstationComponent implements OnInit {
  workstation: WorkStation = new WorkStation();
  formValid = false;
  loading: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  validateInput(event){
    if(event.target.value !== ''){
      event.target.classList.remove("warning-validation");
      event.target.classList.remove("error-validation");
      event.target.className += " success-validation"
    }else{
      event.target.classList.remove("success-validation");
      event.target.classList.remove("warning-validation");
      event.target.className += " error-validation"
    }

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

  /*
  * Metodo para crear registrar una nueva camara
  */
  addWorkStation(){
    CallOut.added = true;
    this.router.navigate(["/consult-workstations"])
  }
}
