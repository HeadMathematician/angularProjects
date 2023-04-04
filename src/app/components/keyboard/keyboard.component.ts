import { ApiService } from './../../services/api.service';
import { KeyboardService } from './../../services/keyboard.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  

  constructor(private keyboardService: KeyboardService, private apiService:ApiService){

  }

row_one = this.keyboardService.row_one;
row_two = this.keyboardService.row_two;
row_three = this.keyboardService.row_three;
randomWord = "";
colorSquares: number[] = [];

  
  setLetter(letter:string){
    if(this.keyboardService.gameStarted){
      if(this.keyboardService.guessedLetters.length < 5){
        this.keyboardService.guessedLetters.push(letter);
        this.keyboardService.letterClick(letter);
        this.keyboardService.squares[this.keyboardService.index] = letter;
        if (this.keyboardService.index < 30){
          this.keyboardService.index++;
        }
      }
    }
  }

  enterBtn(){
    if((this.keyboardService.row + this.keyboardService.index)%6!=0 && this.keyboardService.guessedLetters.length ==5){
      this.keyboardService.enterBtn();
      this.keyboardService.row++;
    }
    
  }

  deleteBtn(){
    if(this.keyboardService.index > 0 && (this.keyboardService.index + this.keyboardService.row)%6!=0){
      this.keyboardService.squares[this.keyboardService.index-1] = '';
      this.keyboardService.index--;
      this.keyboardService.guessedLetters.pop();
    }
  }
}
