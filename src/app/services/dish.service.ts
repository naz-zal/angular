import { Injectable } from '@angular/core';
import { dish } from '../shared/dish';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'

import { baseURL } from "../shared/baseurl"; 
import { ProcessHttpmsgService } from "./process-httpmsg.service"; 
import { RestangularModule, Restangular} from "ngx-restangular";

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch'; 

@Injectable()
export class DishService {

  constructor( private restangular: Restangular, private processHttpmsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<dish[]> {
    return this.restangular.all('dishes').getList();
  } 

  getDish(id: number): Observable<dish> {
    return this.restangular.one('dishes', id).get();
    

  }

  getFeaturedDish(): Observable<dish> {
    return this.restangular.all("dishes").getList({featured:true})
        .map(dishes => dishes[0]);
    
  }
  
  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(food => food.id) })
      .catch(error => { return Observable.of(error); } );
    
  }

}
