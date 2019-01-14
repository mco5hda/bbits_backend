import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WorkStation } from '../../models/workstation.model';
import { Router } from '@angular/router';
import { CallOut } from './../../../utilities/callout';

@Component({
  selector: 'app-edit-workstation',
  templateUrl: './edit-workstation.component.html',
  styleUrls: ['./edit-workstation.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditWorkstationComponent implements OnInit {

  workstation: WorkStation;
  formValid = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.workstation = JSON.parse(sessionStorage.getItem("workStationElement"));
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
  updateWorkStation(){
    CallOut.updated = true;
    this.router.navigate(["/consult-workstations"])
  }

}
