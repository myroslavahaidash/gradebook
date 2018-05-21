import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const YEARS = [
  {
    id: 2016,
    name: '2016 - 2017'
  },
  {
    id: 2017,
    name: '2017 - 2018'
  },
  {
    id: 2018,
    name: '2018 - 2019'
  }
];

@Component({
  selector: 'app-manage-group-subjects-page',
  templateUrl: './manage-group-subjects-page.component.html',
  styleUrls: ['./manage-group-subjects-page.component.scss']
})
export class ManageGroupSubjectsPageComponent implements OnInit {
  years = YEARS;
  currentYear = this.years[1];
  currentSemester = 1;
  selectedYearId;
  selectedSemester;

  openSubjectsTable() {
    this.router.navigate(['manage', 'groups', 1, 'subjects', 'year', this.selectedYearId, 'semester', this.selectedSemester]);
  }
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.selectedYearId = this.currentYear.id;
    this.selectedSemester = this.currentSemester;
  }

}
