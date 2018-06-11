import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { SubjectsPageComponent } from './components/subjects-page/subjects-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { GradesListComponent } from './components/grades-list/grades-list.component';
import { FinalGradesPageComponent } from './components/final-grades-page/final-grades-page.component';
import { GroupsPageComponent } from './components/groups-page/groups-page.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentBoardComponent } from './components/student-board/student-board.component';
import { AddPointsDialogComponent } from './components/add-points-dialog/add-points-dialog.component';
import { UserAreaComponent } from './components/user-area/user-area.component';
import { ChangePasswordPageComponent } from './components/change-password-page/change-password-page.component';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';
import { ManageSubjectsPageComponent } from './components/manage-subjects-page/manage-subjects-page.component';
import { SubjectDialogComponent } from './components/subject-dialog/subject-dialog.component';
import { ManageSpecialitiesPageComponent } from './components/manage-specialities-page/manage-specialities-page.component';
import { SpecialityDialogComponent } from './components/speciality-dialog/speciality-dialog.component';
import { ManageTeachersPageComponent } from './components/manage-teachers-page/manage-teachers-page.component';
import { TeacherDialogComponent } from './components/teacher-dialog/teacher-dialog.component';
import { ManageGroupsPageComponent } from './components/manage-groups-page/manage-groups-page.component';
import { GroupDialogComponent } from './components/group-dialog/group-dialog.component';
import { ManageGroupStudentsPageComponent } from './components/manage-group-students-page/manage-group-students-page.component';
import { ManageGroupSubjectsPageComponent } from './components/manage-group-subjects-page/manage-group-subjects-page.component';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { GroupSubjectDialogComponent } from './components/group-subject-dialog/group-subject-dialog.component';
import { GroupSubjectsListComponent } from './components/group-subjects-list/group-subjects-list.component';
import { AuthService } from './shared/services/auth.service';
import { AdminGuard } from './shared/guards/admin-guard.service';
import { DefaultGuard } from './shared/guards/default-guard.service';
import { SpecialitiesService } from './shared/services/specialities.service';
import { GroupsService } from './shared/services/groups.service';
import { SubjectsService } from './shared/services/subjects.service';
import { TeachersService } from './shared/services/teachers.service';
import { StudentsService } from './shared/services/students.service';
import { GroupScheduleService } from './shared/services/group-schedule.service';
import { GroupSubjectTeachersDialogComponent } from './components/group-subject-teachers-dialog/group-subject-teachers-dialog.component';
import { TeacherGroupsService } from './shared/services/teacher-groups.service';
import { GradesService } from './shared/services/grades.service';
import { LetterGradePipe } from './shared/pipes/letter-grade.pipe';
import { TeacherGuard } from './shared/guards/teacher-guard.service';
import { StudentGuard } from './shared/guards/student-guard.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

registerLocaleData(localeUk, 'uk');

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    SubjectsPageComponent,
    LoginPageComponent,
    GradesListComponent,
    FinalGradesPageComponent,
    GroupsPageComponent,
    StudentsListComponent,
    StudentBoardComponent,
    AddPointsDialogComponent,
    UserAreaComponent,
    ChangePasswordPageComponent,
    ForgotPasswordPageComponent,
    ManageSubjectsPageComponent,
    SubjectDialogComponent,
    ManageSpecialitiesPageComponent,
    SpecialityDialogComponent,
    ManageTeachersPageComponent,
    TeacherDialogComponent,
    ManageGroupsPageComponent,
    GroupDialogComponent,
    ManageGroupStudentsPageComponent,
    ManageGroupSubjectsPageComponent,
    StudentDialogComponent,
    GroupSubjectDialogComponent,
    GroupSubjectsListComponent,
    GroupSubjectTeachersDialogComponent,
    LetterGradePipe,
    ConfirmationDialogComponent,
    PlaceholderComponent
  ],
  entryComponents: [
    AddPointsDialogComponent,
    SubjectDialogComponent,
    SpecialityDialogComponent,
    TeacherDialogComponent,
    GroupDialogComponent,
    StudentDialogComponent,
    GroupSubjectDialogComponent,
    GroupSubjectTeachersDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CustomMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(
      {
        timeOut: 5000
      }
    )
  ],
  providers: [
    AuthService,
    AdminGuard,
    TeacherGuard,
    StudentGuard,
    DefaultGuard,
    SpecialitiesService,
    GroupsService,
    SubjectsService,
    TeachersService,
    StudentsService,
    GroupScheduleService,
    TeacherGroupsService,
    GradesService,
    { provide: LOCALE_ID, useValue: 'uk' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
