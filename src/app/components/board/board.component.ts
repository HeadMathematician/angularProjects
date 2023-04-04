import { ApiService } from './../../services/api.service';
import { KeyboardService } from './../../services/keyboard.service';
import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent{

  constructor(private keyboardService:KeyboardService, private apiService: ApiService){
    
  }
  
  randomWord = "";
  toggleDisplay: boolean = false;


  ngOnInit() {
    this.keyboardService.colorSquares$.subscribe((colorSquares) => {
      this.colorSquares = colorSquares;
    });
  }

  squares = this.keyboardService.squares;
  colorSquares = this.keyboardService.colorSquares;

  start(){
    this.apiService.getRandomWord().subscribe((word: string) => {
      this.randomWord = word;
      this.keyboardService.setRandomWord(word);
    });
    this.keyboardService.guessedLetters = [];
    for(let i = 0; i<30; i++){
      this.keyboardService.squares[i] = '';
    }
    this.keyboardService.index = 0;
    this.keyboardService.gameStarted = true;
    this.colorSquares = Array(30).fill(0);
    this.keyboardService.colorSquares = Array(30).fill(0);
    this.keyboardService.guessedLetters = [];
    this.keyboardService.colIndex = 0;
    this.keyboardService.row = 0;
  }
}
