import {Component, HostListener} from '@angular/core';
import { HeaderComponent} from '../header.component';

@Component({
  selector: 'main-submenu',
  template:
      `
        <ul id="list-content" class="M-Navigation-Main__items" role="menubar">
          <div *ngIf="mainMenu">
          <li id="main-list" *ngFor="let item of MENU_ITEMS; first as isFirst" class="M-Navigation__item M-Navigation-Main__item" (mouseover)="item.mouseover()" (click)="item.click()" (mouseleave)="item.mouseexit()">
            <a *ngIf="isFirst" class="M-Navigation__link M-Navigation-Main__link M-Navigation-Main__linkWithSub M-Navigation__link--active M-Navigation-Main__link--active">
              <span>{{ item.name }}</span>
              <img src="./assets/ico/bosch-ic-forward-right.svg" alt="Forward" width="25" height="25" class="A-Icon A-Icon--forward-right">
            </a>
            <a *ngIf="!isFirst" class="M-Navigation__link M-Navigation-Main__link M-Navigation-Main__linkWithSub">
              <span>{{ item.name }}</span>
              <img src="./assets/ico/bosch-ic-forward-right.svg" alt="Forward" width="25" height="25" class="A-Icon A-Icon--forward-right">
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
        {name: this.IP_CAMERA, link: '/consult-ip-cameras'},
        {name: this.IP_RECORDING, link: '/consult-ip-recordings'},
        {name: this.ANALOG_CAMERA, link: '/consult-analog-cameras'},
        {name: this.ANALOG_RECORDING, link: '/consult-analog-recordings'},
        {name: this.ACCESSORIES, link: ''},
        {name: this.WORKSTATIONS, link: '/consult-workstations'},
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
  isOpen = true;

  constructor(private headerComponent: HeaderComponent) {}

  /*
  *  Mouse click when is a cellphone view
  * */

  mouseClick(name) {
    if (HeaderComponent.isAMobileView()) {
      let subElements = ``;
      document.getElementById('list-content').style.animation = 'fpSlideRight 0.2s';

      setTimeout(()=> {
        document.getElementById('mobile-subOptions').style.animation = 'fpSlideLeft 0.2s';
      }, 200);

      this.MENU_ITEMS.forEach(element => {
        if (element.name === name) {
          element.subOptions.forEach(option => {
            subElements +=
              `<li class="M-Navigation__item M-Navigation-Main__item">
                   <a class="M-Navigation__link M-Navigation-Main__link M-Navigation-Main__linkWithSub" onclick="submenuClick()">
                      <span> ${option.name}</span>
                   </a>
                </li>`;
          });
          this.mainMenu = false;
          this.name = name;
          let mobileOptions =  document.getElementById('mobile-subOptions');
          mobileOptions.innerHTML = subElements;
          return;
        }
      });
    }
  }/* mouse click */

  submenuClick(){
       console.log('Click');
  }

  onClickBackButton(){
    if (HeaderComponent.isAMobileView()) {
      document.getElementById('mobile-subOptions').style.animation = 'fpSlideRight 0.2s';
      setTimeout(()=> {
        this.mainMenu = true;
        document.getElementById('mobile-subOptions').innerHTML = '';
        document.getElementById('list-content').style.animation = 'fpSlideLeft 0.2s';
      }, 200);

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
