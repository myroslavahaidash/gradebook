import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

const date = moment(new Date()).format('ll');

const GRADES = [
  {
    points: 10,
    description: 'Laboratory Work',
    createdAt: date
  },
  {
    points: 40,
    description: 'Exam',
    createdAt: date
  },
  {
    points: 20,
    description: 'Conference',
    createdAt: date
  }
];

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.scss']
})
export class GradesListComponent implements OnInit {
  displayedColumns = ['description', 'points', 'createdAt', 'delete'];
  dataSource = GRADES;

  onDelete(id) {
    console.log(id);
  }

  constructor() { }

  ngOnInit() {
  }

}
