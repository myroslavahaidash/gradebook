import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { SpecialityDialogComponent } from '../speciality-dialog/speciality-dialog.component';
import { SpecialitiesService } from '../specialities.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-manage-specialities-page',
  templateUrl: './manage-specialities-page.component.html',
  styleUrls: ['./manage-specialities-page.component.scss']
})
export class ManageSpecialitiesPageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private specialitiesService: SpecialitiesService
  ) { }

  specialities;
  dataSource;
  displayedColumns = ['speciality', 'code', 'edit', 'delete'];
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openEditSubjectDialog(speciality) {
    const dialogRef = this.dialog.open(SpecialityDialogComponent, {
      width: '250px',
      data: {
        speciality,
        mode: 'edit'
      }
    });
  }

  onDelete(speciality) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        windowTitle: 'Видалення спеціальності',
        itemName: speciality.code + ' - ' + speciality.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.specialitiesService.deleteSpeciality(speciality.id);
      }
    });
  }

  openAddSubjectDialog() {
    const dialogRef = this.dialog.open(SpecialityDialogComponent, {
      width: '250px',
      data: {
        mode: 'add'
      }
    });
  }

  ngOnInit() {
    this.specialitiesService.getSpecialities().subscribe(specialities => {
      this.specialities = specialities;
      this.dataSource = new MatTableDataSource(this.specialities);
    });

    this.dataSource.sort = this.sort;
  }

}
