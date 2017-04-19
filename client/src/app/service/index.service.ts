import { Injectable }    from '@angular/core';
import {  Http } from '@angular/http';
import {IDomNode} from "../idom-node";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';


@Injectable()
export class IndexService {
  private modelFile = '/data/dom.json';  // URL to web api

  constructor(private http: Http ) {
  }

  getModelData(): Observable<any> {
    return this.http.get('../../assets/' + this.modelFile).map(res => res.json());
}

}
