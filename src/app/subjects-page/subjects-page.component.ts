import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-subjects-page',
  templateUrl: './subjects-page.component.html',
  styleUrls: ['./subjects-page.component.scss']
})
export class SubjectsPageComponent implements OnInit {

  constructor(
    private subjectsService: SubjectsService
  ) { }

  subjects;

  ngOnInit() {
    this.subjectsService.getStudentCurrentSubjects().subscribe(subjects => {
      console.log(subjects);
      this.subjects = subjects;
    });
  }
}
