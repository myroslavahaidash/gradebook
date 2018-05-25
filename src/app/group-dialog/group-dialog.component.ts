import { Component, OnInit, Inject } from '@angular/core';
import { SpecialitiesService } from '../specialities.service';
import { GroupsService } from '../groups.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {
  constructor(
    private specialitiesService: SpecialitiesService,
    private groupsService: GroupsService,
    private dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  mode;
  code;
  date;
  selectedSpeciality;
  specialities;

  onSubmit() {
    if (this.data.mode === 'add') {
      this.groupsService.createGroup(this.code, this.date.format('YYYY-MM-DD'), this.selectedSpeciality.id);
      this.dialogRef.close();
    }

    if (this.data.mode === 'edit') {
      this.groupsService.updateGroup(this.data.group.id, this.code, this.selectedSpeciality);
      this.dialogRef.close();
    }
  }

  ngOnInit() {
    this.mode = this.data.mode;
    this.specialitiesService.getSpecialities().subscribe(specialities => {
      this.specialities = specialities;
      if (this.data.mode === 'edit' && this.data.group) {
        this.code = this.data.group.code;
        this.selectedSpeciality = this.specialities.find(speciality => speciality.id === this.data.group.speciality.id);
        // console.log(this.selectedSpeciality);
      }
    });
  }
}

