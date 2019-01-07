import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatSnackBarModule, MatDialogModule, MatMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddIpCameraComponent } from './video/ip-cameras/add-ip-camera/add-ip-camera.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { RequestAccessComponent } from './login/request-access/request-access.component';
import { HeaderComponent } from './header/header/header.component';
import { MainComponent } from './main/main/main.component';
import { AddAnalogCameraComponent } from './video/analog-cameras/add-analog-camera/add-analog-camera.component';
import { AddAnalogRecordingComponent } from './video/analog-recordings/add-analog-recording/add-analog-recording.component';
import { AddIpRecordingComponent } from './video/ip-recordings/add-ip-recording/add-ip-recording.component';

import { MainSubmenuComponent } from './header/header/header-submenus/main-submenu';
import { VideoDesktopSubmenuComponent } from  './header/header/header-submenus/desktop-submenu/video-desktop-submenu';

@NgModule({
  declarations: [
    AppComponent,
    AddIpCameraComponent,
    SignInComponent,
    ResetPasswordComponent,
    RequestAccessComponent,
    HeaderComponent,
    MainComponent,
    AddAnalogCameraComponent,
    AddAnalogRecordingComponent,
    AddIpRecordingComponent,
    MainSubmenuComponent,
    VideoDesktopSubmenuComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
