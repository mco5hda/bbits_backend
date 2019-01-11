import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WorkStation } from '../../models/workstation.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-workstation',
  templateUrl: './details-workstation.component.html',
  styleUrls: ['./details-workstation.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsWorkstationComponent implements OnInit {

  workStation: WorkStation;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.workStation = JSON.parse(sessionStorage.getItem("workStationElement"));
  }

  changeTab(id: number){
    let x = document.getElementsByClassName('M-NavigationTabs__tabContent') as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('M-NavigationTabs__tabContent--active')
      x[i].classList.remove('visible')
    }

    for (let i = 0; i < x.length; i++) {
      if(x[i].tabIndex === id){
        x[i].className += ' M-NavigationTabs__tabContent--active visible'
      }
    }
  }

  editWorkStation(id: number){
    sessionStorage.setItem("workStationElement", JSON.stringify(this.workStation));
    this.router.navigate(["/edit-workstation"]);
  }

  deleteWorkStation(id: number){
    alert('Delete');
  }

}
