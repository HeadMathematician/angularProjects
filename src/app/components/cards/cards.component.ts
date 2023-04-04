import { Card, CARDS } from './../../models/Card';
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  animations: [
    trigger('flip', [
      state('front', style({ transform: 'rotateY(0deg)' })),
      state('back', style({ transform: 'rotateY(180deg)' })),
      transition('front => back', animate('500ms ease-out')),
      transition('back => front', animate('500ms ease-out')),
    ]),
  ],
})
export class CardsComponent {
  cards: Card[] = CARDS;
  selectedCards: Card[] = [];
  matchedCards: number[] = [];
  gameCond = false;
  

  constructor(){
    this.shuffleArray(this.cards);
  }

  gameStart(){
    this.gameCond = true;
  }


  shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
   }
  }

  
  showCard(card:Card){
    if(this.gameCond==true){
      if(this.selectedCards.length < 2 && !this.selectedCards.includes(card) && !this.matchedCards.includes(card.id)){
        card.image1 = card.image2;
        this.selectedCards.push(card);
      }
      if(this.selectedCards.length == 2){
        if(this.selectedCards[0].id == this.selectedCards[1].id){
          this.matchedCards.push(this.selectedCards[0].id);
          this.selectedCards = [];
        }
        else{
          setTimeout(() =>{
            this.selectedCards.forEach(selectedCard =>{
              selectedCard.image1 = '/assets/pozadina.jpg';  
            });
            this.selectedCards = [];
          },1000);
        }
      }
      if(this.matchedCards.length == this.cards.length / 2){
        setTimeout(() => {
          alert('Congratulations! You found all pairs!');
        },500);
        
      }
    }
    
  }
  
}
