import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.scss']
})
export class SubjectDialogComponent implements OnInit {

  constructor(
    private subjectsService: SubjectsService,
    private dialogRef: MatDialogRef<SubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  name;
  mode;

  ngOnInit() {
    this.mode = this.data.mode;
    if (this.data.mode === 'edit' && this.data.subject) {
      this.name = this.data.subject.name;
    }
  }

  onSubmit() {
    if (this.data.mode === 'add') {
      this.subjectsService.createSubject(this.name);
      this.dialogRef.close();
    }

    if (this.data.mode === 'edit') {
      this.subjectsService.updateSubject(this.data.subject.id, this.name);
      this.dialogRef.close();
    }
  }

}
