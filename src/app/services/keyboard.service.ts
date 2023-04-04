import { ApiService } from './api.service';
import { ROW_ONE, ROW_TWO, ROW_THREE } from './../models/letters';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {

  constructor(private apiService: ApiService) { }

  row_one = ROW_ONE;
  row_two = ROW_TWO;
  row_three = ROW_THREE;
  randomWord = "";
  colorSquares: number[] = Array(30).fill(0);
  colorSquares$ = new BehaviorSubject<number[]>(this.colorSquares);
  clickedLetter = ''
  index = 0;
  gameStarted = false;
  colIndex = 0;
  row = 0;
  
  squares = Array(30).fill('');
  guessedLetters: string[] = [];


  letterClick(letter:string){
      this.clickedLetter = letter;
  }

  setRandomWord(word: string) {
    this.randomWord = word;
  }
  
  enterBtn(){
    let gL = this.guessedLetters;
    let rW = this.randomWord;

    if(this.guessedLetters.length == 5){
      for(let i = 0; i < 5; i++){
        if(gL[i]!=rW[i].toUpperCase()) {
          this.colorSquares[i+this.colIndex] = 3;
        }
        if(gL[i] == rW[i].toUpperCase()){
          this.colorSquares[i+this.colIndex] = 1;
        } else if(rW.toUpperCase().includes(gL[i])){
          this.colorSquares[i+this.colIndex] = 2;
        } 
      }

      if(this.guessedLetters.join('') == this.randomWord.toUpperCase()){
        setTimeout(() =>{
          alert('Congratulations, you found the word!');
        },500);
        this.gameStarted = false;
      }
      if(this.index == 30 && this.guessedLetters.join('') != this.randomWord.toUpperCase()){
        setTimeout(() =>{
          alert("You didn'find the word.Try again!")
        },500);
        this.gameStarted = false;
      }
      console.log(rW + ' ovo je random word');
      console.log(gL + ' ovo je nasa rijec');
      this.colorSquares$.next(this.colorSquares);
      this.colIndex+=5;
      this.guessedLetters = [];
    }

    console.log(this.colorSquares)
  }

}
