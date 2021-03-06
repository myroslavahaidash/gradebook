import { Component, OnInit } from '@angular/core';
import { GroupScheduleService } from '../../shared/services/group-schedule.service';
import { GroupsService } from '../../shared/services/groups.service';
import { MatTableDataSource } from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-manage-group-subjects-page',
  templateUrl: './manage-group-subjects-page.component.html',
  styleUrls: ['./manage-group-subjects-page.component.scss']
})
export class ManageGroupSubjectsPageComponent implements OnInit {
  constructor(
    private groupScheduleService: GroupScheduleService,
    private groupsService: GroupsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  groupId;
  group;
  semesters;
  dataSource;


  ngOnInit() {
    this.route.params.switchMap(
      params => {
        this.groupId = +params.groupid;
        return this.groupScheduleService.getGroupSemesters(this.groupId);
      }).subscribe(semesters => {
        this.semesters = semesters;
        this.dataSource = new MatTableDataSource(this.semesters);
    });

    this.route.params.switchMap(
      params => {
        this.groupId = +params.groupid;
        return this.groupsService.getGroup(this.groupId);
      }).subscribe(group => {
      this.group = group;
    });
  }

}
