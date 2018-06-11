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
    this.adminService.fetchData((exams) => this.fetchDataDone(exams));
  }

  fetchDataDone(exams: any) {
    console.log(exams);
    this.exams = exams;
    this.setCurrentDetail(this.exams[0]);  // initially set to first element
  }
  setCurrentDetail(currentExam: any) {
    this.currentExam = currentExam;
  }

  addNewExam() {
    this.addExam = true;
    this.examToAdd = new Exam();
    this.currentExam = this.examToAdd;
  }
  persistExam() {
    // ToDo persit Exam in Database e.g. this.examToAdd
    this.addExam = false;
    this.adminService.addNewExam(this.examToAdd, (exams) => this.fetchDataDone(exams));
  }
  saveChanges() {
    // ToDo persit Exam in Database e.g. this.currentExam
    this.adminService.saveChanges(this.currentExam, (exams) => this.fetchDataDone(exams));
  }
  deleteCurrent() {
    this.adminService.deleteExam(this.currentExam, (exams) => this.fetchDataDone(exams));
  }

  setActive(examId: string) {
    if (examId === this.currentExam.examId) {
      return true;
    } else {
      return false;
    }
  }
}
