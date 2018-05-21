import {Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import * as moment from 'moment';

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

const date = moment(new Date()).format('ll');

const FINAL_GRADES = [
  {
    subject: 'Management Research Project ',
    points: 95,
    mark: getMark(95),
    year: '2014-2015',
    semester: 'I',
    teacher: 'Hal Abelson'
  },
  {
    subject: 'IT Experience',
    points: 93,
    mark: getMark(93),
    year: '2014-2015',
    semester: 'I',
    teacher: 'Dimitri Antoniadis'
  },
  {
    subject: 'Mobile Networking',
    points: 85,
    mark: getMark(85),
    year: '2014-2015',
    semester: 'I',
    teacher: 'Tim Berners-Lee'
  },
  {
    subject: 'Networking Essentials',
    points: 77,
    mark: getMark(77),
    year: '2014-2015',
    semester: 'I',
    teacher: 'Dimitri Bertsekas'
  },
  {
    subject: 'People Management for IT',
    points: 61,
    mark: getMark(61),
    year: '2015-2016',
    semester: 'II',
    teacher: 'Tamara Broderick'
  }
];

@Component({
  selector: 'app-final-grades-page',
  templateUrl: './final-grades-page.component.html',
  styleUrls: ['./final-grades-page.component.scss']
})
export class FinalGradesPageComponent implements OnInit {
  displayedColumns = ['subject', 'points', 'mark', 'year', 'semester', 'teacher'];
  dataSource = new MatTableDataSource(FINAL_GRADES);
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  constructor() {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
