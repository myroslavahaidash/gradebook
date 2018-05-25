import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService
  ) { }

  students = [];
  groupId;

  ngOnInit() {
    this.route.params.switchMap(
      params => {
        this.groupId = +params.groupid;
        return this.groupsService.getGroupStudents(this.groupId);
      }).subscribe(groupStudents => {
      this.students = groupStudents;
    });
  }

}
