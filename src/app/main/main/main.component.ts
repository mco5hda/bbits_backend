import {Component, OnInit} from '@angular/core';
import { MainService} from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  productType : string = '';

  constructor( private service : MainService) { }

  ngOnInit() {
  }

  onSubmit() {

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadFile() {

    this.currentFileUpload = this.selectedFiles.item(0);

    this.service.getDatasheetInformation(this.currentFileUpload, this.productType)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
