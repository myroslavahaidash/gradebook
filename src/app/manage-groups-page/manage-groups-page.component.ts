import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { GroupDialogComponent } from '../group-dialog/group-dialog.component';
import { GroupsService } from '../groups.service';


@Component({
  selector: 'app-manage-groups-page',
  templateUrl: './manage-groups-page.component.html',
  styleUrls: ['./manage-groups-page.component.scss']
})
export class ManageGroupsPageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private groupsService: GroupsService
  ) { }

  dataSource;
  groups;
  displayedColumns = ['group', 'speciality', 'students', 'subjects', 'edit', 'delete'];
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onDelete(id) {
    this.groupsService.deleteGroup(id);
  }

  openAddGroupDialog() {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      width: '250px',
      data: {
        mode: 'add'
      }
    });
  }

  openEditGroupDialog(group) {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      width: '250px',
      data: {
        mode: 'edit',
        group
      }
    });
  }

  ngOnInit() {
    this.groupsService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.dataSource = new MatTableDataSource(this.groups);
    });

    this.dataSource.sort = this.sort;
  }

}

