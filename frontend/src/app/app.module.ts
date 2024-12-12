import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ManagerComponent } from './manager/manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManagerloginComponent } from './managerlogin/managerlogin.component';
import { PatientlekariComponent } from './patientlekari/patientlekari.component';
import { PatientpreglediComponent } from './patientpregledi/patientpregledi.component';
import { PatientobavestenjaComponent } from './patientobavestenja/patientobavestenja.component';
import { DoctorcardComponent } from './doctorcard/doctorcard.component';
import { DoctorpreglediComponent } from './doctorpregledi/doctorpregledi.component';
import { DoctorraznoComponent } from './doctorrazno/doctorrazno.component';
import { PatientcardComponent } from './patientcard/patientcard.component';
import { RegisterdoctorComponent } from './registerdoctor/registerdoctor.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PatientComponent,
    DoctorComponent,
    ManagerComponent,
    LoginComponent,
    RegisterComponent,
    ManagerloginComponent,
    PatientlekariComponent,
    PatientpreglediComponent,
    PatientobavestenjaComponent,
    DoctorcardComponent,
    DoctorpreglediComponent,
    DoctorraznoComponent,
    PatientcardComponent,
    RegisterdoctorComponent,
    ChangepasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
