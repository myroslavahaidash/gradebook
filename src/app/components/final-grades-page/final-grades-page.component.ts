import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { GradesService } from '../../shared/services/grades.service';

@Component({
  selector: 'app-final-grades-page',
  templateUrl: './final-grades-page.component.html',
  styleUrls: ['./final-grades-page.component.scss']
})
export class FinalGradesPageComponent implements OnInit {

  constructor(
    private gradesService: GradesService
  ) {}

  finalGrades;
  displayedColumns = ['subject', 'assessmentType', 'points', 'mark', 'course', 'semester', 'teacher'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.gradesService.getStudentFinalGrades().subscribe(finalGrades => {
      this.finalGrades = finalGrades;
      this.dataSource = new MatTableDataSource(this.finalGrades);
      this.dataSource.sort = this.sort;
    });
  }

}
