import { Component, OnInit } from '@angular/core';

const STUDENTS = [
  {
    id: 1,
    name: 'Egor Sobolev'
  },
  {
    id: 2,
    name: 'Anna Ivanova'
  },
  {
    id: 3,
    name: 'Valeria Andreeva'
  }
];

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  students = STUDENTS;
  constructor() { }

  ngOnInit() {
  }

}
