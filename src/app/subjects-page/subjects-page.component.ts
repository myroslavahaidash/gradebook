import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const YEARS = ['2015 - 2016', '2016 - 2017', '2017 - 2018', '2018 - 2019'];
const SUBJECTS = [
  {
    id: 1,
    name: 'Economics'
  },
  {
    id: 2,
    name: 'History'
  },
  {
    id: 3,
    name: 'Literature'
  },
  {
    id: 4,
    name: 'Management'
  }
];

@Component({
  selector: 'app-subjects-page',
  templateUrl: './subjects-page.component.html',
  styleUrls: ['./subjects-page.component.scss']
})
export class SubjectsPageComponent implements OnInit {
  currentYear = '2017 - 2018';
  currentSemester = 1;
  selectedYear;
  selectedSemester;
  selectedSubject;
  years = YEARS;
  subjects;

  onSubjectChange(event) {
    this.router.navigate(['subjects', this.selectedSubject]);
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.selectedYear = this.currentYear;
    this.selectedSemester = this.currentSemester;
    this.subjects = SUBJECTS;
  }

}
