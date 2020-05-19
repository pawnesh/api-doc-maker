import { Component, OnInit } from '@angular/core';
import { ApiCollectionService } from '../api-collection.service';
import { ApiCollection } from '../interface/ApiCollection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  public apiContent;
  public message: string;
  public uploadText: string = 'Upload Json File';
  public apis: Array<ApiCollection>;

  constructor(private router: Router, private service: ApiCollectionService) { }

  ngOnInit(): void {
  }

  readFile(fileList: FileList): void {
    let file = fileList[0];
    this.uploadText = 'Reading ' + file.name;
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      let fileContent = fileReader.result as string;
      self.service.parseJSON(fileContent);
      self.apis = self.service.getApi();
      console.log(self.apis);
      self.router.navigate(['/docs']);
    }
    fileReader.readAsText(file);
  }

}
