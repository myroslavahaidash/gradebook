import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { GradesService } from '../grades.service';

function getMark(points) {
  let mark;

  switch (true) {
    case points >= 95:
      mark = 'A';
      break;

    case points >= 85:
      mark = 'B';
      break;

    case points >= 75:
      mark = 'C';
      break;

    case points >= 65:
      mark = 'D';
      break;

    case points >= 60:
      mark = 'E';
      break;

    default:
      mark = 'Err';
  }

  return mark;
}

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
      console.log(finalGrades);
      this.finalGrades = finalGrades;
      this.dataSource = new MatTableDataSource(this.finalGrades);
      this.dataSource.sort = this.sort;
    });
  }

}
