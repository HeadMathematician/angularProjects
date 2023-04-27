import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {

  tableData: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private http: HttpClient
  ) {

  }


  create(form: any) {
    const url = 'http://localhost:8080/api/user';
    const data = {
      loginNo: form.value.loginNo,
      loginUserName: form.value.loginUserName,
      loginPassword: form.value.loginPassword
    };
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);

    this.http.post(url, body, { headers }).subscribe({
      next: (response) => {
        console.log(response);
        this.tableData.push(response); // add the new row to the table data array
        this.dialogRef.close(); // close the dialog
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
