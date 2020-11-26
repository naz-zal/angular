import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { baseURL } from "../shared/baseurl"; 
import { ProcessHttpmsgService } from "./process-httpmsg.service"; 
import { RestangularModule, Restangular} from "ngx-restangular";

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';


@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular, private processHttpmsgService: ProcessHttpmsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
    
  }

  getLeader(id: number): Observable<Leader> {
    return this.restangular.one('leaders', id).get();
    

  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all("leaders").getList({featured:true})
    .map(promotions => promotions[0]);
    
  }

}
  