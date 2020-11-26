import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback'; 

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { baseURL } from "../shared/baseurl"; 
import { ProcessHttpmsgService } from "./process-httpmsg.service"; 
import { RestangularModule, Restangular} from "ngx-restangular";

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular, private processHttpmsgService: ProcessHttpmsgService) { }

  submitFeedback(fb: Feedback): Observable<Feedback>{

    return this.restangular.all('feedback').post(fb); 
  }

}
