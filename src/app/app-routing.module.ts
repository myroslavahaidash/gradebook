import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SubjectsPageComponent } from './subjects-page/subjects-page.component';
import { FinalGradesPageComponent } from './final-grades-page/final-grades-page.component';
import { GradesListComponent } from './grades-list/grades-list.component';
import { GroupsPageComponent } from './groups-page/groups-page.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentBoardComponent } from './student-board/student-board.component';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { ManageSubjectsPageComponent } from './manage-subjects-page/manage-subjects-page.component';
import { ManageSpecialitiesPageComponent } from './manage-specialities-page/manage-specialities-page.component';
import { ManageTeachersPageComponent } from './manage-teachers-page/manage-teachers-page.component';
import { ManageGroupsPageComponent } from './manage-groups-page/manage-groups-page.component';
import { ManageGroupStudentsPageComponent } from './manage-group-students-page/manage-group-students-page.component';
import { ManageGroupSubjectsPageComponent } from './manage-group-subjects-page/manage-group-subjects-page.component';
import { GroupSubjectsListComponent } from './group-subjects-list/group-subjects-list.component';
import { AdminGuard } from './admin-guard.service';
import { DefaultGuard } from './default-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [ DefaultGuard ]
  },
  {
    path: 'forgot_password',
    component: ForgotPasswordPageComponent,
    canActivate: [ DefaultGuard ]
  },
  {
    path: 'change_password',
    component: ChangePasswordPageComponent
  },
  {
    path: 'subjects',
    component: SubjectsPageComponent,
    children: [
      {
        path: ':id',
        component: GradesListComponent
      }
    ]
  },
  {
    path: 'final-grades',
    component: FinalGradesPageComponent
  },
  {
    path: 'groups',
    component: GroupsPageComponent,
    children: [
      {
        path: ':groupid/subjects/:subjectid',
        component: StudentsListComponent,
        children: [
          {
            path: 'students/:id',
            component: StudentBoardComponent
          }
        ]
      }
    ]
  },
  {
    path: 'manage',
    canActivate: [ AdminGuard ],
    canActivateChild: [ AdminGuard ],
    children: [
      {
        path: 'subjects',
        component: ManageSubjectsPageComponent
      },
      {
        path: 'specialities',
        component: ManageSpecialitiesPageComponent
      },
      {
        path: 'teachers',
        component: ManageTeachersPageComponent
      },
      {
        path: 'groups',
        component: ManageGroupsPageComponent
      },
    ]
  },
  {
    path: 'manage/groups/:groupid/students',
    component: ManageGroupStudentsPageComponent
  },
  {
    path: 'manage/groups/:groupid/subjects',
    component: ManageGroupSubjectsPageComponent,
    children: [
      {
        path: 'year/:year/semester/:semester',
        component: GroupSubjectsListComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
