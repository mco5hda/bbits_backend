import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';

//Pagination
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

//Angular material
import { MatSnackBarModule, MatDialogModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddIpCameraComponent } from './video/ip-cameras/add-ip-camera/add-ip-camera.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { HeaderComponent } from './header/header/header.component';
import { MainComponent } from './main/main/main.component';
import { AddAnalogCameraComponent } from './video/analog-cameras/add-analog-camera/add-analog-camera.component';
import { AddAnalogRecordingComponent } from './video/analog-recordings/add-analog-recording/add-analog-recording.component';
import { AddIpRecordingComponent } from './video/ip-recordings/add-ip-recording/add-ip-recording.component';
import { AddWorkstationComponent } from './video/workstations/add-workstation/add-workstation.component';
import { ConsultIpCamerasComponent } from './video/ip-cameras/consult-ip-cameras/consult-ip-cameras.component';
import { DetailsIpCameraComponent } from './video/ip-cameras/details-ip-camera/details-ip-camera.component';
import { EditIpCameraComponent } from './video/ip-cameras/edit-ip-camera/edit-ip-camera.component';
import { EditIpRecordingComponent } from './video/ip-recordings/edit-ip-recording/edit-ip-recording.component';
import { DetailsIpRecordingComponent } from './video/ip-recordings/details-ip-recording/details-ip-recording.component';
import { ConsultIpRecordingsComponent } from './video/ip-recordings/consult-ip-recordings/consult-ip-recordings.component';
import { ConsultAnalogRecordingsComponent } from './video/analog-recordings/consult-analog-recordings/consult-analog-recordings.component';
import { EditAnalogRecordingComponent } from './video/analog-recordings/edit-analog-recording/edit-analog-recording.component';
import { DetailsAnalogRecordingComponent } from './video/analog-recordings/details-analog-recording/details-analog-recording.component';
import { DetailsAnalogCameraComponent } from './video/analog-cameras/details-analog-camera/details-analog-camera.component';
import { EditAnalogCameraComponent } from './video/analog-cameras/edit-analog-camera/edit-analog-camera.component';
import { ConsultAnalogCamerasComponent } from './video/analog-cameras/consult-analog-cameras/consult-analog-cameras.component';
import { ConsultWorkstationsComponent } from './video/workstations/consult-workstations/consult-workstations.component';
import { EditWorkstationComponent } from './video/workstations/edit-workstation/edit-workstation.component';
import { DetailsWorkstationComponent } from './video/workstations/details-workstation/details-workstation.component';

import { MainSubmenuComponent } from './header/header/header-submenus/main-submenu';
import { VideoDesktopSubmenuComponent } from  './header/header/header-submenus/desktop-submenu/video-desktop-submenu';

import  { MainService } from './main/main/main.service';
import { DatasheetService } from './video/datasheet.service';
import { AddLicenseComponent } from './video/licenses/add-license/add-license.component';
import { ConsultLicensesComponent } from './video/licenses/consult-licenses/consult-licenses.component';
import { EditLicenseComponent } from './video/licenses/edit-license/edit-license.component';
import { AddAccessoryComponent } from './video/accessories/add-accessory/add-accessory.component';
import { ConsultAccessoriesComponent } from './video/accessories/consult-accessories/consult-accessories.component';
import { DetailAccessoryComponent } from './video/accessories/detail-accessory/detail-accessory.component';
import { EditAccessoryComponent } from './video/accessories/edit-accessory/edit-accessory.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { RegisterComponent } from './login/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    AddIpCameraComponent,
    SignInComponent,
    ResetPasswordComponent,
    HeaderComponent,
    MainComponent,
    AddAnalogCameraComponent,
    AddAnalogRecordingComponent,
    AddIpRecordingComponent,
    AddWorkstationComponent,
    ConsultIpCamerasComponent,
    DetailsIpCameraComponent,
    EditIpCameraComponent,
    EditIpRecordingComponent,
    DetailsIpRecordingComponent,
    ConsultIpRecordingsComponent,
    ConsultAnalogRecordingsComponent,
    EditAnalogRecordingComponent,
    DetailsAnalogRecordingComponent,
    DetailsAnalogCameraComponent,
    EditAnalogCameraComponent,
    ConsultAnalogCamerasComponent,
    ConsultWorkstationsComponent,
    EditWorkstationComponent,
    DetailsWorkstationComponent,
    MainSubmenuComponent,
    VideoDesktopSubmenuComponent,
    AddLicenseComponent,
    ConsultLicensesComponent,
    EditLicenseComponent,
    AddAccessoryComponent,
    ConsultAccessoriesComponent,
    DetailAccessoryComponent,
    EditAccessoryComponent,
    ConfirmDialogComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [MainService, DatasheetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
