import { Component, OnInit, Inject } from '@angular/core';
import { SpecialitiesService } from '../specialities.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-speciality-dialog',
  templateUrl: './speciality-dialog.component.html',
  styleUrls: ['./speciality-dialog.component.scss']
})
export class SpecialityDialogComponent implements OnInit {

  constructor(
    private specialitiesService: SpecialitiesService,
    private dialogRef: MatDialogRef<SpecialityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  name;
  code;
  mode;

  ngOnInit() {
    this.mode = this.data.mode;
    if (this.data.mode === 'edit' && this.data.speciality) {
      this.name = this.data.speciality.name;
      this.code = this.data.speciality.code;
    }
  }

  onSubmit() {
    if (this.data.mode === 'add') {
      this.specialitiesService.createSpeciality(this.code, this.name);
      this.dialogRef.close();
    }

    if (this.data.mode === 'edit') {
      this.specialitiesService.updateSpeciality(this.data.speciality.id, this.code, this.name);
      this.dialogRef.close();
    }
  }
}
