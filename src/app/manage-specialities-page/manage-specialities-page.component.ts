import {Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { SpecialityDialogComponent } from '../speciality-dialog/speciality-dialog.component';
import { SpecialitiesService } from '../specialities.service';


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

  onDelete(id) {
    this.specialitiesService.deleteSpeciality(id);
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
