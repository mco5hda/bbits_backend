import { Component, OnInit } from '@angular/core';

let active = true;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'bbits-backend';

  ngOnInit(): void {
    console.log('Inicio');
  }

  onMenuOver(option): void {
    switch (option) {
      case 'Video' :
        if (!HeaderComponent.isAMobileView()) {
          document.getElementById('subMenu-video').style.display = 'inherit';
        } else {
          console.log('');
        }
        break;
      case 'Access' :
        console.log('Access');
        break;
      case 'Intrusion' :
        console.log('Intrusion');
        break;
      case 'Communication' :

        break;
      case 'Fire' :
        console.log('Fire');
        break;
    }
  }

  onMenuExit(option): void {
    switch (option) {
      case 'Video' :
        if (!HeaderComponent.isAMobileView()) {
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
        navContent.classList.remove('M-Navigation-Extractor--active');
        const buttonContent = document.getElementById('button-content');
        buttonContent.classList.remove('M-Navigation-Main__toggle--active');
        const navigationContent = document.getElementById('navigation-content');
        navigationContent.classList.remove('is-hidden');
        const listContent = document.getElementById('list-content');
        listContent.classList.remove('M-Navigation-Main__items--expanded');
        active = false;

    } else {
        const navContent = document.getElementById('nav-content');
        navContent.classList.add('M-Navigation-Extractor--active');
        const buttonContent = document.getElementById('button-content');
        buttonContent.classList.add('M-Navigation-Main__toggle--active');
        navContent.classList.add('is-hidden');
        const listContent = document.getElementById('list-content');
        listContent.classList.add('M-Navigation-Main__items--expanded');
        active = true;
    }
  }

  static isAMobileView(): boolean {
    return (document.getElementById('button-content').clientHeight != 0);
  }
}
