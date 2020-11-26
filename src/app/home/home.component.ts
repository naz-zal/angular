import { Component, OnInit, Inject } from '@angular/core';

import { dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

import { flyInOut, expand } from '../animations/app.animation'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: { 
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  }, 
  animations: [flyInOut(), expand()]
})
export class HomeComponent implements OnInit {

  food: dish;
  promotion: Promotion; 
  leader: Leader;

  constructor(private dishservice: DishService, 
  private promotionservice: PromotionService, 
  private leaderservice: LeaderService,  @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(food => this.food = food);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion); 
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader);
  }

}
