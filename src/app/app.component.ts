import { Component, OnInit } from '@angular/core';

let active = true;
const MENU_CLASS_ACTIVE = 'M-Navigation-Main--active';
const videoContent = `<ul id="list-content" class="M-Navigation-Main__items" role="menubar">
          <li class="M-Navigation__item M-Navigation-Main__item" (mouseover)="onMenuOver('Video')" (mouseleave)="onMenuExit('Video')">
            <a class="M-Navigation__link M-Navigation-Main__link M-Navigation-Main__linkWithSub M-Navigation__link--active M-Navigation-Main__link--active">
              <span>IP Cameras</span>
            </a>
          </li>
          <li class="M-Navigation__item M-Navigation-Main__item" (mouseover)="onMenuOver('Access')" (mouseleave)="onMenuExit('Access')">
            <a class="M-Navigation__link M-Navigation-Main__link M-Navigation-Main__linkWithSub">
              <span>Analog Cameras</span>
            </a>
          </li>
          <li class="M-Navigation__item M-Navigation-Main__item" (mouseover)="onMenuOver('Intrusion')" (mouseleave)="onMenuExit('Intrusion')">
            <a class="M-Navigation__link M-Navigation-Main__link M-Navigation-Main__linkWithSub">
              <span>IP Recording</span>
            </a>
          </li>
          <li class="M-Navigation__item M-Navigation-Main__item" (mouseover)="onMenuOver('Communication')" (mouseleave)="onMenuExit('Communication')">
            <a class="M-Navigation__link M-Navigation-Main__link M-Navigation-Main__linkWithSub">
              <span>Analog Recording</span>
            </a>
          </li>
          <li class="M-Navigation__item M-Navigation-Main__item" (mouseover)="onMenuOver('Fire')" (mouseleave)="onMenuExit('Fire')">
            <a class="M-Navigation__link M-Navigation-Main__link M-Navigation-Main__linkWithSub">
              <span>Accessories</span>
            </a>
          </li>
        </ul>`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'bbits-backend';

  ngOnInit(): void {
    console.log('Inicio');
  }

  onMenuOver(option): void {
    switch (option) {
      case 'Video' :
        const  navContent = document.getElementById('nav-content');
        if (navContent.classList[2] === MENU_CLASS_ACTIVE) {
        } else {
          document.getElementById('subMenu-video').style.display = 'inherit';
        }
        break;
      case 'Access' :
        console.log('Access');
        break;
      case 'Intrusion' :
        console.log('Intrusion');
        break;
      case 'Communication' :
        console.log('Communication');
        break;
      case 'Fire' :
        console.log('Fire');
        break;
    }
  }

  onMenuExit(option): void {
    switch (option) {
      case 'Video' :
        const  navContent = document.getElementById('nav-content');
        if (navContent.classList[2] === MENU_CLASS_ACTIVE) {
        } else {
          document.getElementById('subMenu-video').style.display = 'none';
        }
        break;
      case 'Access' :
        console.log('Access Out');
        break;
      case 'Intrusion' :
        console.log('Intrusion Out');
        break;
      case 'Communication' :
        console.log('Communication Out');
        break;
      case 'Fire' :
        console.log('Fire Out');
        break;
    }
  }

 /*
  * Hamburger Menu animation
  * */

  onClickShowMenu(): void {
    if (active) {
      const navContent = document.getElementById('nav-content');
      navContent.classList.remove('M-Navigation-Main--active');
      const buttonContent = document.getElementById('button-content');
      buttonContent.classList.remove('M-Navigation-Main__toggle--active');
      const navigationContent = document.getElementById('navigation-content');
      navigationContent.classList.remove('is-hidden');
      const listContent = document.getElementById('list-content');
      listContent.classList.remove('M-Navigation-Main__items--expanded');
      active = false;

    } else {
      const navContent = document.getElementById('nav-content');
      navContent.classList.add('M-Navigation-Main--active');
      const buttonContent = document.getElementById('button-content');
      buttonContent.classList.add('M-Navigation-Main__toggle--active');
      navContent.classList.add('is-hidden');
      const listContent = document.getElementById('list-content');
      listContent.classList.add('M-Navigation-Main__items--expanded');
      active = true;
    }
  }
}
