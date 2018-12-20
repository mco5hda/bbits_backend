import { Component, OnInit } from '@angular/core';
let active = true;

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

  onClickShowMenu(): void {
    if (active) {
      const navContent = document.getElementById('nav-content');
      navContent.classList.remove('M-Navigation-Main--active');
      const buttonContent = document.getElementById('button-content');
      buttonContent.classList.remove('M-Navigation-Main__toggle--active');
      const navigationContent = document.getElementById('navigation-content');
      navigationContent.classList.remove('is-hidden');
      const listContenet = document.getElementById('list-content');
      listContenet.classList.remove('M-Navigation-Main__items--expanded');
      active = false;

    } else {
      const navContent = document.getElementById('nav-content');
      navContent.classList.add('M-Navigation-Main--active');
      const buttonContent = document.getElementById('button-content');
      buttonContent.classList.add('M-Navigation-Main__toggle--active');
      const navigationContent = document.getElementById('navigation-content');
      navContent.classList.add('is-hidden');
      const listContenet = document.getElementById('list-content');
      listContenet.classList.add('M-Navigation-Main__items--expanded');
      active = true;
    }
  }
}
