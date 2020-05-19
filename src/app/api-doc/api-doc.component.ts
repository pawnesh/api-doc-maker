import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiCollectionService } from '../api-collection.service';
import { ApiCollection } from '../interface/ApiCollection';

@Component({
  selector: 'app-api-doc',
  templateUrl: './api-doc.component.html',
  styleUrls: ['./api-doc.component.css']
})

export class ApiDocComponent implements OnInit {

  public apis: Array<ApiCollection>;
  public message: String = new String('abd');

  constructor(private service: ApiCollectionService) { this.apis = []; }

  ngOnInit(): void {
    this.apis = this.service.getApi();
    console.log(this.apis);
  }

  ngAfterViewInit(): void {
    done();
  }
}
