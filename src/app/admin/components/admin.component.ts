import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Exam } from '../../model/exam';

@Component({
  selector: 'app-admin',
  templateUrl: '../views/admin.component.html'
})
export class AdminComponent implements OnInit {

  public exams: Exam[] = [];
  public currentExam: Exam;
  public examToAdd: Exam;
  public addExam: boolean;


  constructor(private adminService: AdminService) {
    this.addExam = false;
  }

  ngOnInit() {
    // patch to API after backend is finished
    this.adminService.fetchData('assets/mockingData/exam-mocking-data.json', (exams) => this.fetchDataDone(exams));
  }

  fetchDataDone(exams: any) {
    this.exams = exams.enrollments;
    this.setCurrentDetail(this.exams[0]);  // initially set to first element
  }
  setCurrentDetail(currentExam: any) {
    this.currentExam = currentExam;
  }

  addNewExam() {
    this.addExam = true;
    this.examToAdd = new Exam();
    this.exams.push(this.examToAdd);
    this.currentExam = this.examToAdd;
  }
  persistExam() {
    // ToDo persit Exam in Database e.g. this.examToAdd
    this.addExam = false;
    this.adminService.addNewExam(this.examToAdd);
  }
  saveChanges() {
    // ToDo persit Exam in Database e.g. this.currentExam
    this.adminService.saveChanges(this.currentExam);
  }
  setActive(examId: string) {
    if (examId === this.currentExam.examId) {
      return true;
    } else {
      return false;
    }
  }
}
