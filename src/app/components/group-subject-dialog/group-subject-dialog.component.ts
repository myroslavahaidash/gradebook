import { Component, OnInit, Inject } from '@angular/core';
import { GroupScheduleService } from '../../shared/services/group-schedule.service';
import { SubjectsService } from '../../shared/services/subjects.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-group-subject-dialog',
  templateUrl: './group-subject-dialog.component.html',
  styleUrls: ['./group-subject-dialog.component.scss']
})
export class GroupSubjectDialogComponent implements OnInit {

  constructor(
    private groupScheduleService: GroupScheduleService,
    private subjectsService: SubjectsService,
    private dialogRef: MatDialogRef<GroupSubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  assessmentTypes;
  selectedAssessmentType;
  subjects;
  selectedSubject;

  onSubmit() {
    this.groupScheduleService
      .addGroupSemesterSubject(this.data.groupId, this.data.year, this.data.semester, this.selectedSubject, this.selectedAssessmentType);
    this.dialogRef.close();
  }

  ngOnInit() {
    this.subjectsService.getSubjects().subscribe(subjects => this.subjects = subjects);
    this.groupScheduleService.getAssessmentTypes().subscribe(assessmentTypes => this.assessmentTypes = assessmentTypes);
  }

}
