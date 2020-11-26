import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from "../shared/feedback"; 

import { FeedbackService } from '../services/feedback.service';
import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: { 
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  }, 
  animations: [flyInOut(), expand()]
})
export class ContactComponent implements OnInit {

  errmess: string;
  submitted = true; 
  added = true;
  feedcopy = null;
  feedbackForm: FormGroup; 
  feedback: Feedback; 
  contactType = ContactType; 
  formErrors = {
  
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };
  
  validationMessages = {
  
    'firstname': {
        'required': 'First name is required',
        'minlength': "First name should be at least 2 characters long",
        'maxlength': "First name should not be more than 25 characters long"
    }, 
    'lastname': {
        'required': 'Last name is required',
        'minlength': "Last name should be at least 2 characters long",
        'maxlength': "Last name should not be more than 25 characters long"
    }, 
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required':'Email is required.',
      'email':'Email not in valid format.'
    }
  };
  
  
  
  constructor(private fb: FormBuilder, private feedbackservice: FeedbackService) { 
  
    this.createForm(); 
  }

  ngOnInit() {
  }
  
  createForm() {
    this.feedbackForm = this.fb.group({
        firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ], 
        telnum: ['', [Validators.required, Validators.pattern] ],
        email: ['', [Validators.required, Validators.email] ],
        agree: false,
        contacttype: 'None',
        message: ''
        
    });
    this.feedbackForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
        
    this.onValueChanged(); 
  
  }
  
  onSubmit() {
    this.feedback = this.feedbackForm.value; 
    this.submitted = false; 
    this.added = false; 
    this.feedbackservice.submitFeedback(this.feedback)
      .subscribe(feed => {
        this.feedcopy = feed;
        this.added = true; 
        setTimeout(() => {this.feedcopy = false; this.submitted = true; 
          }, 5000);
        
      }, errmess => this.errmess = <any>errmess);
    console.log(this.feedback);
    this.feedbackForm.reset({
        firstname: '',
        lastname: '',
        telnum: '',
        email: '',
        agree: false,
        contacttype: 'None',
        message: ''
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