import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

const GROUPS = [
  {
    id: 1,
    name: 'ZP-1'
  },
  {
    id: 2,
    name: 'ZP-2'
  },
  {
    id: 3,
    name: 'ZK-1'
  },
  {
    id: 4,
    name: 'ZK-2'
  }
];

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
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {
  groups = GROUPS;
  subjects = [];
  selectedGroup;
  selectedSubject;

  onGroupChange(event) {
    this.subjects = SUBJECTS;
    this.selectedSubject = this.subjects[1];
    this.router.navigate(['groups', this.selectedGroup, 'subjects', 1]);
  }

  onSubjectChange() {
    this.router.navigate(['groups', this.selectedGroup, 'subjects', this.selectedSubject]);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route.firstChild) {
      this.route.firstChild.params.subscribe(
        params => {
          this.selectedGroup = +params.groupid;
          this.subjects = SUBJECTS;
          this.selectedSubject = +params.subjectid;
        });
    }
  }
}
