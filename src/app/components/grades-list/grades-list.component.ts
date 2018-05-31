import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradesService } from '../../shared/services/grades.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.scss']
})
export class GradesListComponent implements OnInit {

  constructor(
    private gradesService: GradesService,
    private route: ActivatedRoute
  ) { }

  grades;
  displayedColumns = ['description', 'points', 'createdAt'];
  dataSource;
  subjectId;

  ngOnInit() {
    this.route.params.switchMap(params => {
      this.subjectId = +params.subjectid;
      return this.gradesService.getStudentGrades(this.subjectId);
    }).subscribe(grades => {
      this.grades = grades;
      this.dataSource = new MatTableDataSource(this.grades.currentGrades);
    });
  }

}
