import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  // message = '';
  
  constructor(
    private dialog: MatDialog
  ) { }

  openConfirmDialog(){
    return this.dialog.open( ConfirmDialogComponent, {
      disableClose: true
    });
  }
}
