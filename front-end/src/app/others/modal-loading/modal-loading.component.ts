import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-loading.component.html',
  styleUrls: ['./modal-loading.component.css']
})
export class ModalLoadingComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalLoadingComponent>) { }


  ngOnInit(): void {
  }

}
