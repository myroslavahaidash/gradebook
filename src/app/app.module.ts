import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { SubjectsPageComponent } from './subjects-page/subjects-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { GradesListComponent } from './grades-list/grades-list.component';
import { FinalGradesPageComponent } from './final-grades-page/final-grades-page.component';
import { GroupsPageComponent } from './groups-page/groups-page.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentBoardComponent } from './student-board/student-board.component';
import { AddPointsDialogComponent } from './add-points-dialog/add-points-dialog.component';
import { UserAreaComponent } from './user-area/user-area.component';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { ManageSubjectsPageComponent } from './manage-subjects-page/manage-subjects-page.component';
import { SubjectDialogComponent } from './subject-dialog/subject-dialog.component';
import { ManageSpecialitiesPageComponent } from './manage-specialities-page/manage-specialities-page.component';
import { SpecialityDialogComponent } from './speciality-dialog/speciality-dialog.component';
import { ManageTeachersPageComponent } from './manage-teachers-page/manage-teachers-page.component';
import { TeacherDialogComponent } from './teacher-dialog/teacher-dialog.component';
import { ManageGroupsPageComponent } from './manage-groups-page/manage-groups-page.component';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import { ManageGroupStudentsPageComponent } from './manage-group-students-page/manage-group-students-page.component';
import { ManageGroupSubjectsPageComponent } from './manage-group-subjects-page/manage-group-subjects-page.component';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { GroupSubjectDialogComponent } from './group-subject-dialog/group-subject-dialog.component';
import { GroupSubjectsListComponent } from './group-subjects-list/group-subjects-list.component';
import { AuthService } from './auth.service';
import { AdminGuard } from './admin-guard.service';
import { DefaultGuard } from './default-guard.service';
import { SpecialitiesService } from './specialities.service';
import { GroupsService } from './groups.service';
import { SubjectsService } from './subjects.service';
import { TeachersService } from './teachers.service';
import { StudentsService } from './students.service';
import { GroupScheduleService } from './group-schedule.service';
import { GroupSubjectTeachersDialogComponent } from './group-subject-teachers-dialog/group-subject-teachers-dialog.component';
import { TeacherGroupsService } from './teacher-groups.service';
import { GradesService } from './grades.service';
import { LetterGradePipe } from './letter-grade.pipe';
import {TeacherGuard} from './teacher-guard.service';
import {StudentGuard} from './student-guard.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';


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
    BrowserAnimationsModule
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
    GradesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
