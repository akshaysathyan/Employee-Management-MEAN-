import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LeavesComponent } from './leaves/leaves.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AddLeaveRequestComponent } from './add-leave-request/add-leave-request.component';
import { LoginComponent } from './core/login/login.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './Guard/auth.guard';
import { AdminGuard } from './Guard/admin.guard';


const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},

  {path :"allleaves",component:LeavesComponent,canActivate:[AuthGuard]},
  {path:"allemployee/asd",component:EmployeeListComponent,canActivate:[AuthGuard]},
  {path:"createEmply",component:CreateEmployeeComponent,canActivate:[AuthGuard]},
  {path:"editemployee",component:EditEmployeeComponent,canActivate:[AuthGuard]},
  {path:"addleave",component:AddLeaveRequestComponent,canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent},
  {path:"userprofile",component:UserProfileComponent,canActivate:[AuthGuard]},
  {path:"useredit",component:UserEditComponent,canActivate:[AuthGuard]},
  {path:"forgotpassword",component:ForgotPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
