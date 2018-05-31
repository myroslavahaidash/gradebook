import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SubjectsPageComponent } from './components/subjects-page/subjects-page.component';
import { FinalGradesPageComponent } from './components/final-grades-page/final-grades-page.component';
import { GradesListComponent } from './components/grades-list/grades-list.component';
import { GroupsPageComponent } from './components/groups-page/groups-page.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentBoardComponent } from './components/student-board/student-board.component';
import { ChangePasswordPageComponent } from './components/change-password-page/change-password-page.component';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';
import { ManageSubjectsPageComponent } from './components/manage-subjects-page/manage-subjects-page.component';
import { ManageSpecialitiesPageComponent } from './components/manage-specialities-page/manage-specialities-page.component';
import { ManageTeachersPageComponent } from './components/manage-teachers-page/manage-teachers-page.component';
import { ManageGroupsPageComponent } from './components/manage-groups-page/manage-groups-page.component';
import { ManageGroupStudentsPageComponent } from './components/manage-group-students-page/manage-group-students-page.component';
import { ManageGroupSubjectsPageComponent } from './components/manage-group-subjects-page/manage-group-subjects-page.component';
import { GroupSubjectsListComponent } from './components/group-subjects-list/group-subjects-list.component';
import { AdminGuard } from './shared/guards/admin-guard.service';
import { TeacherGuard } from './shared/guards/teacher-guard.service';
import { DefaultGuard } from './shared/guards/default-guard.service';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

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
        path: '',
        pathMatch: 'full',
        component: PlaceholderComponent
      },
      {
        path: ':subjectid',
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
    canActivate: [ TeacherGuard ]
  },
  {
    path: 'groups/:groupid/subjects/:subjectid/students',
    component: StudentsListComponent,
    canActivate: [ TeacherGuard ],
    canActivateChild: [ TeacherGuard ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PlaceholderComponent
      },
      {
        path: ':studentid',
        component: StudentBoardComponent
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
      {
        path: 'groups/:groupid/students',
        component: ManageGroupStudentsPageComponent
      },
      {
        path: 'groups/:groupid/subjects',
        component: ManageGroupSubjectsPageComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: PlaceholderComponent
          },
          {
            path: 'year/:year/semesters/:semester',
            component: GroupSubjectsListComponent
          }
        ]
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
