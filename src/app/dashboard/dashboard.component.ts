
import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { CrudService } from '../service/crud.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
    providers:[CrudService]
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : any="" ;
  editTaskValue : any ="";

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe((res:any) => {
      this.taskArr = res;
    }, (err:any) => {
      alert("Unable to get list of tasks");
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe((res:any) => {
      this.ngOnInit();
      this.addTaskValue = '';
    },( err:any) => {
      alert(err);
    })
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe((res:any) => {
      this.ngOnInit();
    }, (err:any)=> {
      alert(err);
    })
  }

  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe((res:any) => {
      this.ngOnInit();
    }, (err:any)=> {
      alert("Failed to delete task");
    });
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }


}
