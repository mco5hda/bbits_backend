import {Component, HostListener} from '@angular/core';
import { HeaderComponent} from '../header.component';
import {__await} from 'tslib';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'main-submenu',
  template:
      `
        <ul id="list-content" class="M-Navigation-Main__items" role="menubar">
          <div *ngIf="mainMenu">
          <li id="main-list" *ngFor="let item of MENU_ITEMS; first as isFirst" class="M-Navigation__item M-Navigation-Main__item" (mouseover)="item.mouseover()" (click)="item.click()" (mouseleave)="item.mouseexit()">
            <a *ngIf="isFirst" class="M-Navigation__link M-Navigation-Main__link M-Navigation-Main__linkWithSub M-Navigation__link--active M-Navigation-Main__link--active">
              <span>{{ item.name }}</span>
            </a>
            <a *ngIf="!isFirst" class="M-Navigation__link M-Navigation-Main__link M-Navigation-Main__linkWithSub">
              <span>{{ item.name }}</span>
            </a>
          </li>
          </div>
           <a *ngIf="!mainMenu" class="M-Navigation__backLink" (click)="onClickBackButton()">
              <img src="./assets/ico/bosch-ic-back-left.svg" alt="Back" width="30" height="30">
              <span class="M-Navigation__backLinkText" id="header-name">{{ name }}</span>
           </a>
          <div id="mobile-subOptions"></div>
        </ul>
      `
})
export class MainSubmenuComponent {

  readonly IP_CAMERA: String = 'IP Camera';
  readonly ACCESSORIES: String = 'Accessories';
  readonly IP_RECORDING: String = 'IP Recording';
  readonly ANALOG_CAMERA: String = 'Analog Camera';
  readonly ANALOG_RECORDING: String = 'Analog Recording';
  readonly WORKSTATIONS: String = 'Workstations';
  readonly LICENSES: String = 'Licenses';

  readonly MENU_ITEMS =
    [ {
      name: 'Video',
      link: '#',
      mouseover: () => {
        this.headerComponent.onMenuOver('Video');
      },
      mouseexit: () => {
        this.headerComponent.onMenuExit('Video');
      },
      click: () => {
        this.mouseClick('Video');
      },
      subOptions: [
        {name: this.IP_CAMERA, link: '#'},
        {name: this.IP_RECORDING, link: '#'},
        {name: this.ANALOG_CAMERA, link: '#'},
        {name: this.ANALOG_RECORDING, link: '#'},
        {name: this.ACCESSORIES, link: '#'},
        {name: this.WORKSTATIONS, link: '#'},
        {name: this.LICENSES, link: '#'}
      ]
    },
      {
        name: 'Access',
        link: '#',
        mouseover: () => {
          this.headerComponent.onMenuOver('Access');
        },
        mouseexit: () => {
          this.headerComponent.onMenuExit('Access');
        },
        click: () => {
          this.mouseClick('Access');
        },
        subOptions: []
      },
      {
        name: 'Intrusion',
        link: '#',
        mouseover: () => {
          this.headerComponent.onMenuOver('Intrusion');
        },
        mouseexit: () => {
          this.headerComponent.onMenuExit('Intrusion');
        },
        click: () => {
          this.mouseClick('Intrusion');
        },
        subOptions: []
      },
      {
        name: 'Communications',
        link: '#',
        mouseover: () => {
          this.headerComponent.onMenuOver('Communication');
        },
        mouseexit: () => {
          this.headerComponent.onMenuExit('Communication');
        },
        click: () => {
          this.mouseClick('Communication');
        },
        subOptions: []
      },
      {
        name: 'Fire',
        link: '#',
        mouseover: () => {
          this.headerComponent.onMenuOver('Fire');
        },
        mouseexit: () => {
          this.headerComponent.onMenuExit('Fire');
        },
        click: () => {
          this.mouseClick('Fire');
        },
        subOptions: []
      }];



  public mainMenu : boolean = true;
  public name : String = '';

  constructor(private headerComponent: HeaderComponent) {}

  /*
  *  Mouse click when is a cellphone view
  * */

  async mouseClick(name) {
    if (HeaderComponent.isAMobileView()) {
      let subElements = ``;
      this.MENU_ITEMS.forEach(element => {
        if (element.name === name) {
          element.subOptions.forEach(option => {
            subElements +=
              `<li class="M-Navigation__item M-Navigation-Main__item">
                   <a class="M-Navigation__link M-Navigation-Main__link M-Navigation-Main__linkWithSub">
                      <span> ${option.name} </span>
                   </a>
                </li>`;
          });
/*
          for(let i = 0; i <= 100; i++){
              document.getElementById('main-list').style.transform = `translate3d(${-i}%,0,0)` ;
               delay(100);
          }
*/
          this.mainMenu = false;
          this.name = name;

          let mobileOptions =  document.getElementById('mobile-subOptions');
          mobileOptions.innerHTML = subElements;
          return;
        }
      });
    }
  }/* mouse click */

  onClickBackButton(){
    if (HeaderComponent.isAMobileView()) {
      this.mainMenu = true;
      document.getElementById('mobile-subOptions').innerHTML = '';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    if (!HeaderComponent.isAMobileView()) {
      this.mainMenu = true;
      document.getElementById('mobile-subOptions').innerHTML = '';
    }
  }
}
