import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from './table.service';
import { editModal } from './edit.modal';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private tableSrv: TableService, public dialog: MatDialog) {}

  data = new MatTableDataSource([]);
  dataColumns = ['name', 'user_type', 'entity', 'status', 'action'];

  title = 'zetta-test';

  getData() {
    this.tableSrv.getData().subscribe((res) => {
      this.data.data = res;
      this.data.filter = '';
      console.log(res);
    });
  }

  async deleteData(i) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.data.splice(i, 1);
        this.data.filter = '';
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  editData(element) {
    console.log(element, 'element');
    const dataInject = {
      ...element,
      editMode: true,
    };
    const dialogRef = this.dialog.open(editModal, {
      data: dataInject,
      minWidth: '60%',
      maxWidth: '80%',
      maxHeight: '80%',
      disableClose: true,
    });
  }

  showStatus(element){
    if(element['user_status'] === 'pending'){
      return 'accent'
    }

    if(element['user_status'] === 'active'){
      return 'primary'
    }
  }

  labelStyle(element){

    let style = {
      'font-size': '14px',
      'height': '12px',
      'padding': '8px',
      'width': '25%',
      'border-radius': '7px',
    }
    if(element['company']['user_type'] === 'Mentor'){
      style['background'] = '#FFD63F'
    }else{
      style['background'] = '#CE423A'
    }

    return style
  }

  createUserData() {
    const dialogRef = this.dialog.open(editModal, {
      minWidth: '60%',
      maxWidth: '80%',
      maxHeight: '80%',
      disableClose: true,
      data: { editMode: false },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res, 'ress');
      if (res !== undefined && res['statusCode'] === 1) {
        this.data.data.push(res['data']);
        this.data.filter = '';
        Swal.fire('Bravo!', 'Email is Available!', 'success');
      }
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
