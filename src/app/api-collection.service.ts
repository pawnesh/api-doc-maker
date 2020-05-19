import { Injectable } from '@angular/core';
import { ApiCollection } from './interface/ApiCollection';
import { Api } from './interface/Api';

@Injectable({
  providedIn: 'root'
})
export class ApiCollectionService {

  public apis: Array<ApiCollection> = [];

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
        'description': '',
        'url': item.request.url.raw,
        'header': item.request.header,
        'body': this.getBody(item.request),
        'bodyType': this.getBodyType(item.request)
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
    if(request.body.form_data){
      return request.body.form_data;
    }
  }
  getBodyType(request) {
    if(!request.body){
      return '';
    }
    let type = request.body.options;
    if (type.raw && type.raw.language && type.raw.language == 'json') {
      return 'json';
    }
    return 'form-data';
  }

  getApi():Array<ApiCollection>{
    return this.apis;
  }
}
