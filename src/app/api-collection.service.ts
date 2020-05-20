import { Injectable } from '@angular/core';
import { ApiCollection } from './interface/ApiCollection';
import { Api } from './interface/Api';

@Injectable({
  providedIn: 'root'
})
export class ApiCollectionService {

  public apis: Array<ApiCollection> = [];
  public collectionName:string = '-_-';

  constructor() {

  }

  parseJSON(jsonString){
    if(jsonString == ''){
      return;
    }
    let jsonObject = JSON.parse(jsonString);
    if (!jsonObject.item) {
      return;
    }

    this.apis = [];
    let collection: ApiCollection = {
      'name': 'Api Collection',
      'apis': []
    };
    this.traceApiItem(jsonObject,collection);
    this.apis.push(collection);
  }

  traceApiItem(jsonObject, collection: ApiCollection) {
    let self = this;
    jsonObject.item.forEach(element => {
      if (element.item) {
        let collectionTemp:ApiCollection = {
          'name': element.name,
          'apis': []
        }
        collectionTemp = self.traceApiItem(element,collectionTemp)
        self.apis.push(collectionTemp);
      } else {
        // single item entity
        collection = self.addApi(element, collection);
      }
    });
    return collection;
  }

  addApi(item, collection: ApiCollection) {
    let tempItem = [];
    if (item.request) {
      let api: Api = {
        'name': item.name,
        'method': item.request.method,
        'description': item.request.description?item.request.description:'',
        'url': item.request.url.raw,
        'header': item.request.header,
        'body': this.getBody(item.request),
        'bodyType': this.getBodyType(item.request),
        'active': false
      };
      collection.apis.push(api);
    }
    return collection;
  }

  getBody(request){
    if(!request.body){
      return '';
    }
    if(request.body.raw){
      return request.body.raw;
    }
    if(request.body.formdata){
      return request.body.formdata;
    }
    return '';
  }
  getBodyType(request) {
    if(!request.body){
      return '';
    }
    if(request.body.formdata){
      return 'form-data';
    }
    return 'json';
  }

  getApi():Array<ApiCollection>{
    return this.apis;
  }
}
