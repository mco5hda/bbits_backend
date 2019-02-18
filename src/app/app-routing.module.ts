import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { AddIpCameraComponent } from './video/ip-cameras/add-ip-camera/add-ip-camera.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { MainComponent } from './main/main/main.component';
import { AddAnalogCameraComponent } from './video/analog-cameras/add-analog-camera/add-analog-camera.component';
import { AddIpRecordingComponent } from './video/ip-recordings/add-ip-recording/add-ip-recording.component';
import { AddAnalogRecordingComponent } from './video/analog-recordings/add-analog-recording/add-analog-recording.component';
import { AddWorkstationComponent } from './video/workstations/add-workstation/add-workstation.component';
import { ConsultIpCamerasComponent } from './video/ip-cameras/consult-ip-cameras/consult-ip-cameras.component';
import { DetailsIpCameraComponent } from './video/ip-cameras/details-ip-camera/details-ip-camera.component';
import { EditIpCameraComponent } from './video/ip-cameras/edit-ip-camera/edit-ip-camera.component';
import { EditAnalogRecordingComponent } from './video/analog-recordings/edit-analog-recording/edit-analog-recording.component';
import { DetailsAnalogRecordingComponent } from './video/analog-recordings/details-analog-recording/details-analog-recording.component';
import { ConsultAnalogRecordingsComponent } from './video/analog-recordings/consult-analog-recordings/consult-analog-recordings.component';
import { EditAnalogCameraComponent } from './video/analog-cameras/edit-analog-camera/edit-analog-camera.component';
import { DetailsAnalogCameraComponent } from './video/analog-cameras/details-analog-camera/details-analog-camera.component';
import { ConsultAnalogCamerasComponent } from './video/analog-cameras/consult-analog-cameras/consult-analog-cameras.component';
import { EditIpRecordingComponent } from './video/ip-recordings/edit-ip-recording/edit-ip-recording.component';
import { DetailsIpRecordingComponent } from './video/ip-recordings/details-ip-recording/details-ip-recording.component';
import { ConsultIpRecordingsComponent } from './video/ip-recordings/consult-ip-recordings/consult-ip-recordings.component';
import { EditWorkstationComponent } from './video/workstations/edit-workstation/edit-workstation.component';
import { DetailsWorkstationComponent } from './video/workstations/details-workstation/details-workstation.component';
import { ConsultWorkstationsComponent } from './video/workstations/consult-workstations/consult-workstations.component';
import { AddLicenseComponent } from './video/licenses/add-license/add-license.component';
import { ConsultLicensesComponent } from './video/licenses/consult-licenses/consult-licenses.component';
import { EditLicenseComponent } from './video/licenses/edit-license/edit-license.component';
import { DetailAccessoryComponent } from './video/accessories/detail-accessory/detail-accessory.component';
import { EditAccessoryComponent } from './video/accessories/edit-accessory/edit-accessory.component';
import { ConsultAccessoriesComponent } from './video/accessories/consult-accessories/consult-accessories.component';
import { AddAccessoryComponent } from './video/accessories/add-accessory/add-accessory.component';
import { RegisterComponent } from './login/register/register.component';

const routes: Routes = [
  { path: "", component: SignInComponent },
  { path: "login", component: SignInComponent },
  { path: "reset-password", component: ResetPasswordComponent},
  { path: "register", component: RegisterComponent},
  { path: "home", component: MainComponent },
  { path: "add-ip-camera", component: AddIpCameraComponent},
  { path: "add-analog-camera", component: AddAnalogCameraComponent},
  { path: "add-ip-recording", component: AddIpRecordingComponent},
  { path: "add-analog-recording", component: AddAnalogRecordingComponent},
  { path: "add-workstation", component: AddWorkstationComponent},
  { path: "consult-ip-cameras", component: ConsultIpCamerasComponent},
  { path: "details-ip-camera", component: DetailsIpCameraComponent},
  { path: "edit-ip-camera", component: EditIpCameraComponent},
  { path: "consult-ip-recordings", component: ConsultIpRecordingsComponent},
  { path: "details-ip-recording", component: DetailsIpRecordingComponent},
  { path: "edit-ip-recording", component: EditIpRecordingComponent},
  { path: "consult-analog-cameras", component: ConsultAnalogCamerasComponent},
  { path: "details-analog-camera", component: DetailsAnalogCameraComponent},
  { path: "edit-analog-camera", component: EditAnalogCameraComponent},
  { path: "consult-analog-recordings", component: ConsultAnalogRecordingsComponent},
  { path: "details-analog-recording", component: DetailsAnalogRecordingComponent},
  { path: "edit-analog-recording", component: EditAnalogRecordingComponent},
  { path: "consult-workstations", component: ConsultWorkstationsComponent},
  { path: "details-workstation", component: DetailsWorkstationComponent},
  { path: "edit-workstation", component: EditWorkstationComponent},
  { path: "add-license", component: AddLicenseComponent},
  { path: "consult-licenses", component: ConsultLicensesComponent},
  { path: "edit-license", component: EditLicenseComponent},
  { path: "add-accessory", component: AddAccessoryComponent},
  { path: "consult-accessories", component: ConsultAccessoriesComponent},
  { path: "edit-accessory", component: EditAccessoryComponent},
  { path: "details-accessory", component: DetailAccessoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
