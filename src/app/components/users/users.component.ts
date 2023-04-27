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
  displayEdit = false;
  oldLoginNo: any;

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
    const temp = this.oldLoginNo;
    const updatedUser = this.dataSource[this.editIndex];
    this.apiService.updateUser(temp, updatedUser).subscribe(() => {
      this.dataSource[this.editIndex] = updatedUser;
      this.displayEdit = false;
    });
  }
  

  editRow(index: number): void {
    this.editIndex = index;
    this.displayEdit = true;
    this.oldLoginNo = this.dataSource[this.editIndex].loginNo;
  }

  cancelEdit(): void {
    this.displayEdit = false;
  }

}
