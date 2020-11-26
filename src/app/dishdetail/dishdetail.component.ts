import { Component, OnInit, Inject } from '@angular/core';
import { dish } from "../shared/dish";
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service'; 
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from "../shared/comment";
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  host: { 
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  }, 
  animations: [flyInOut(), visibility(), expand()]
})
export class DishdetailComponent implements OnInit {

    
  formErrors = {
    'comment': '',
    'author': ''
  };
  
  feedbackForm: FormGroup; 
  feedback: Comment; 
  food: dish;
  foodcopy = null; 
  dishIds: number[];
  prev: number;
  next: number; 
  errmess: string;
  visibility = "shown"
  
  validationMessages = {
   
    'comment': {
        'required': 'Comment is required',
        'minlength': "Comment should be at least 4 characters long",
        'maxlength': "Comment should not be more than 100 characters long"
    }, 
    'author': {
        'required': 'Name is required',
        'minlength': "Name should be at least 2 characters long",
        'maxlength': "Name should not be more than 25 characters long"
    }
  };
  
  constructor(private fb: FormBuilder, private dishservice: DishService, private route: ActivatedRoute, private location: Location,  @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.switchMap((params: Params) => {this.visibility = "hidden"; return this.dishservice.getDish(+params['id']); })
    .subscribe(food => {this.food = food; this.foodcopy = food; this.setPrevNext(food.id); this.visibility = "shown"; }, 
      errmess =>  this.errmess = <any>errmess); 
  }

  setPrevNext(dishId: number){
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }
  
  goBack(): void {
    this.location.back(); 
  }
  
  createForm() {
    this.feedbackForm = this.fb.group({
        rating: 0,
        comment: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)] ],
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        date: ''
        

    });
    this.feedbackForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
        
    this.onValueChanged(); 
  
  }
  
  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.feedback["date"] = String(Date.now())
    console.log(this.feedback);
    this.foodcopy.comments.push(this.feedback);
    this.foodcopy.save()
      .subscribe(food => this.food = food);
    this.feedbackForm.reset({
        comment: '',
        author: '',
        rating: 5
    });
    
    
  
    

  }
  
  onValueChanged(data?: any){
    
    if(!this.feedbackForm) {return;}
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
        
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
        }
    }
  
  }

}
}

