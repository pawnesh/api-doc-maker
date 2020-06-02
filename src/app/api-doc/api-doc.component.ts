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
  }

  toggle(api): void {
    api.active = api.active ? false : true;
  }

  openAll(): void {
    for (let i = 0; i < this.apis.length; i++) {
      for (let j = 0; j < this.apis[i].apis.length; j++) {
        this.apis[i].apis[j].active = true;
      }
    }
  }

  saveDoc(): void {
    this.openAll();
    var doc = document.getElementsByTagName('app-api-doc')[0].innerHTML;
    var docs = doc.split('class="active"');
    doc = docs.join('');
    var html = '<!DOCTYPE HTML><html><head> <title>Demo</title> <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap" rel="stylesheet"> <style>body{font-family: \'Open Sans\', sans-serif;}h5{text-align:center;}.nav-wrapper{display: flex; justify-content: center;}ul li{list-style: none;}.row{display: flex; justify-content: flex-start; flex-flow: row nowrap;}.col.l3{width: 60px;}.collapsible-header{padding: 10px; border: 1px solid #CCC; border-bottom: none; cursor: pointer;}.collapsible-header.open{border-bottom: 1px solid #CCC;}li:last-child .collapsible-header{border-bottom: 1px solid #CCC;}.collapsible .expandable{display: flex;}.collapsible-header .row{margin-left: unset; margin-bottom: unset;}.collapsible-header .l3{width: 60px;}.box{background: #f8f8f8; color: #282828; margin-bottom: 15px; word-break: break-all; border: 1px solid #e6e6e6; padding: 6px 10px; border-radius: 3px; font-size: 12px;}.code{background-color: rgba(51, 51, 51, 0.05); color: #d9d9d9 !important;}.container{margin-top: 20px;}.collapsible-body{display: none; padding: 25px 10px;}.green-text{color: #26B47F; font-weight: 1000;}.orange-text{color: #FFB400; font-weight: 1000;}.code .orange-text{font-weight: inherit; padding: 17px;}</style></head><body> <nav> <div class="nav-wrapper"> <h2 class="brand-logo">API Doc</h2> </div></nav> <div class="container">[api-doc-maker]</div><script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script> <script>$(\'.collapsible-header\').click(function (){if ($(this).parent().find(".collapsible-body").css(\'display\')==\'none\'){$(this).parent().find(".collapsible-body").slideDown(); $(this).addClass(\'open\');}else{$(this).parent().find(".collapsible-body").slideUp(); $(this).removeClass(\'open\');}}); $(\'.collapsible-body\').hide();</script></body></html>';

    html = html.replace('[api-doc-maker]',doc);
    var self = this;
    setTimeout(function(){
      self.download(html,'file','html');
    },1000);
  }

  download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

}
