import { Component, OnInit, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrl: './confirmation-dialog.component.scss',
    standalone: true,
    imports: [MatDialogContent, MatDialogActions, MatButton]
})
export class ConfirmationDialogComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  readonly data = inject<string>(MAT_DIALOG_DATA);
  // readonly animal = model(this.data.animal);

  constructor(){ }

  ngOnInit(): void {

  }

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }

}
