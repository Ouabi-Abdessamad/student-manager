import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Student} from '../dto/student.model'


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  selectedStudent: Student;
  students: Student[];
  baseURL = 'http://localhost:3000/students';

  constructor(private http:HttpClient) { }

  postStudent(student: Student){
    return this.http.post(this.baseURL.concat('/save'), student);
  }

  getStudents(){
    return this.http.get(this.baseURL);
  }

  updateStudent(student:Student){
    return this.http.put(this.baseURL.concat(`/update/${student._id}`), student);
  }

  deleteStudent(id:String){
    return this.http.delete(this.baseURL.concat(`/delete/${id}`));
  }

}
