import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Marios } from 'src/app/interfaces/marios';

@Component({
  selector: 'app-marios-dialog',
  templateUrl: './marios-dialog.component.html',
  styleUrls: ['./marios-dialog.component.css'],
})
export class MariosDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<MariosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Marios
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
