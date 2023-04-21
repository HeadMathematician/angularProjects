import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { DepartmentDialogComponent } from '../department-dialog/department-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  columns = ['Login Number', 'Login Username', 'Login Password'];
  dataSource: any[] = [];
  editIndex = -1;

  constructor(private apiService: ApiService, private dialog: MatDialog){

  }

  ngOnInit(){
    this.apiService.getUsers().subscribe((data: any[]) =>{
      console.log(this.dataSource);
      this.dataSource = data;
    })
  }


  deleteUser(loginNo: number){
    this.apiService.deleteUser(loginNo).subscribe(() => {
      this.dataSource = this.dataSource.filter((user) => user.loginNo !== loginNo);
    });
  }

  addUserDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  saveRow(): void {
    const updatedUser = this.dataSource[this.editIndex];
    this.apiService.updateUser(updatedUser).subscribe(() => {
      this.dataSource[this.editIndex] = updatedUser;
      this.editIndex = -1;
    });
  }
  

  editRow(index: number): void {
    this.editIndex = index;
  }

  cancelEdit(): void {
    this.editIndex = -1;
  }

}
