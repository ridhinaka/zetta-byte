import {
  OnInit,
  Component,
  OnDestroy,
  ViewChild,
  Inject,
  EventEmitter,
} from '@angular/core';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { TableService } from './table.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'details-edit-customer-management-modal',
  templateUrl: './edit.modal.html',
  // styleUrls: ['./details-edit-customer-management.modal.css']
})
export class editModal implements OnInit {
  constructor(
    private dialogref: MatDialogRef<editModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private tableSrv: TableService
  ) {}

  dataUser = {};
  checkEmail = 0;

  dataForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    civility: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    entity: new FormControl({ value: 'Company', disabled: true }, [
      Validators.required,
    ]),
    company: new FormControl({ value: 'MCDONALD', disabled: true }, [
      Validators.required,
    ]),
    user_type: new FormControl('', [Validators.required]),
  });

  dataMentor = [{ name: 'HR' }, { name: 'Mentor' }];
  dataCivility = [
    { name: 'Mr.', value: 'MR' },
    { name: 'Mrs.', value: 'MRS' },
  ];

  checkEmailAvaibility() {
    if (this.dataForm.controls.email.invalid) {
      return true;
    }

    return false;
  }

  isEmailExist() {
    this.tableSrv.getData().subscribe((res) => {
      for (const eachEmail of res) {
        if (eachEmail['email'] === this.dataForm.controls.email.value) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email already Exist!',
          });
          return;
        } else {
          this.checkEmail = 1;
          Swal.fire('Bravo!', 'Email is Available!', 'success');
        }
      }
    });
  }

  getPreviousValueForm() {
    this.dataForm.controls.email.setValue(this.data['email']);
    this.dataForm.controls.civility.setValue(this.data['civility']);
    this.dataForm.controls.first_name.setValue(this.data['first_name']);
    this.dataForm.controls.last_name.setValue(this.data['last_name']);
    this.dataForm.controls.user_type.setValue(
      this.data['company']['user_type']
    );
  }

  createUser() {
    const Create_Data = {
      civility: this.dataForm.controls.civility.value,
      email: this.dataForm.controls.email.value,
      company: {
        name: this.dataForm.controls.entity.value,
        user_type: this.dataForm.controls.user_type.value,
      },
      first_name: this.dataForm.controls.first_name.value,
      last_name: this.dataForm.controls.last_name.value,
      user_status: 'pending',
    };

    if(this.checkEmail !== 1){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Check your email first!',
      });
      return;
    }

    this.dataUser = Create_Data;
    this.closeDialogCreate();
    this.clearData();
  }

  clearData() {
    this.dataForm.reset();
  }

  closeDialog() {
    this.dialogref.close();
  }

  closeDialogCreate() {
    this.dialogref.close({
      statusCode: 1,
      data: this.dataUser,
    });
  }

  disabledSubmit(){
    if(this.dataForm.invalid){
      return true
    }

    return false
  }

  ngOnInit(): void {
    console.log(this.data, 'this.data');
    if (this.data['editMode'] === true) {
      this.getPreviousValueForm();
    }
  }
}
