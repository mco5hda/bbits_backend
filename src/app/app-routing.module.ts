import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { AddIpCameraComponent } from './video/ip-cameras/add-ip-camera/add-ip-camera.component';
import { RequestAccessComponent } from './login/request-access/request-access.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { MainComponent } from './main/main/main.component';
import { AddAnalogCameraComponent } from './video/analog-cameras/add-analog-camera/add-analog-camera.component';
import { AddIpRecordingComponent } from './video/ip-recordings/add-ip-recording/add-ip-recording.component';
import { AddAnalogRecordingComponent } from './video/analog-recordings/add-analog-recording/add-analog-recording.component';
import { ViewIpCameraComponent } from './video/ip-cameras/view-ip-camera/view-ip-camera.component';


const routes: Routes = [
  { path: "", component: SignInComponent },
  { path: "login", component: SignInComponent },
  { path: "reset-password", component: ResetPasswordComponent},
  { path: "request-access", component: RequestAccessComponent},
  { path: "home", component: MainComponent },
  { path: "add-ip-camera", component: AddIpCameraComponent},
  { path: "add-analog-camera", component: AddAnalogCameraComponent},
  { path: "add-ip-recording", component: AddIpRecordingComponent},
  { path: "add-analog-recording", component: AddAnalogRecordingComponent},
  { path: "view-ip-camera", component : ViewIpCameraComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
