import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerloginComponent } from './managerlogin/managerlogin.component';
import { PatientlekariComponent } from './patientlekari/patientlekari.component';
import { PatientpreglediComponent } from './patientpregledi/patientpregledi.component';
import { PatientobavestenjaComponent } from './patientobavestenja/patientobavestenja.component';
import { DoctorcardComponent } from './doctorcard/doctorcard.component';
import { DoctorpreglediComponent } from './doctorpregledi/doctorpregledi.component';
import { DoctorraznoComponent } from './doctorrazno/doctorrazno.component';
import { PatientcardComponent } from './patientcard/patientcard.component';
import { AuthGuard } from './auth.guard';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [
  {path: "", redirectTo:'/homepage',pathMatch:'full'},
  {
    path: "patient", component: PatientComponent,
    canActivate:[AuthGuard],
    data:{
      role:'patient'
    }
  },
  {
    path:"homepage",component:HomepageComponent
  },
  {
    path:"doctor",component: DoctorComponent,
    canActivate:[AuthGuard],
    data:{
      role:'doctor'
    }
  },
  {
    path:"manager", component: ManagerComponent,
    canActivate:[AuthGuard],
    data:{
      role:'manager'
    }
  },
  {
    path:"patientlekari", component: PatientlekariComponent,
    canActivate:[AuthGuard],
    data:{
      role:'patient'
    }
  },
  {
    path:"patientpregledi", component: PatientpreglediComponent,
    canActivate:[AuthGuard],
    data:{
      role:'patient'
    }
  },
  {
    path:"patientobavestenja", component: PatientobavestenjaComponent,
    canActivate:[AuthGuard],
    data:{
      role:'patient'
    }
  },
  {
    path:"managerlogin", component: ManagerloginComponent
  },
  {
    path:"doctorcard", component: DoctorcardComponent,
    canActivate:[AuthGuard],
    data:{
      role:'patient'
    }
  },
  {
    path:"doctorpregledi", component: DoctorpreglediComponent,
    canActivate:[AuthGuard],
    data:{
      role:'doctor'
    }
  },
  {
    path:"doctorrazno", component: DoctorraznoComponent,
    canActivate:[AuthGuard],
    data:{
      role:'doctor'
    }
  },
  {
    path:"patientcard", component: PatientcardComponent,
    canActivate:[AuthGuard],
    data:{
      role:'doctor'
    }
  },
  
  // {path:'**', component:NotFoundComponent}    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
