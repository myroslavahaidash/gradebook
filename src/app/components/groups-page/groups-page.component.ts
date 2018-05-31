import { Component, OnInit } from '@angular/core';
import { TeacherGroupsService } from '../../shared/services/teacher-groups.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {
  constructor(
    private teachersGroupsService: TeacherGroupsService
  ) { }

  groups;
  dataSource;
  displayedColumns = ['group', 'subjects'];

  ngOnInit() {
    this.teachersGroupsService.getTeacherGroups()
      .subscribe(groups => {
        this.groups = groups;
        this.dataSource = new MatTableDataSource(this.groups);
      });
  }
}
