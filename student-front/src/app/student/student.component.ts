import { Component } from '@angular/core';
import { NgForm}   from '@angular/forms';
import { StudentService } from '../service/student.service';
import {Student} from '../dto/student.model';
declare var M: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService]
})
export class StudentComponent {
  constructor(public studentService?:StudentService){}

  ngOnInit(): void {
      this.resetForm();
      this.loadTable();
  }

  onSubmit(studentForm?:NgForm):void{
    if(studentForm.value._id == ''){
        this.studentService.postStudent(studentForm.value).subscribe(student=>{
          this.resetForm(studentForm);
          this.loadTable();
          M.toast({html: 'Registered successfully!' , classes: 'rounded'});
        });
    }else{
      this.studentService.updateStudent(studentForm.value).subscribe(student=>{
        this.resetForm(studentForm);
        this.loadTable();
        M.toast({html: 'Updated successfully!' , classes: 'rounded'});
      });
    }
  }
  resetForm(studentForm?:NgForm):void{ 
    if(studentForm){
        studentForm.reset();
    }
    this.studentService.selectedStudent = {
      _id: "",
      name: "",
      email: "",
      address: "",
      age: null
    };
  }

  loadTable(){
    this.studentService.getStudents().subscribe(students=>{
      this.studentService.students = students as Student[];
    })
  }

  onEdit(student:Student){
      this.studentService.selectedStudent = student;
  }

  onDelete(id:String, studentForm?:NgForm){
    if(confirm('Are you sure you want to delete this student') == true){
      this.studentService.deleteStudent(id).subscribe(data =>{
        this.loadTable();
        M.toast({html: 'Deleted successfully!' , classes: 'rounded'});
      });
    }
     
  }
}
