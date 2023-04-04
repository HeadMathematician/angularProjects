import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = "https://random-word-api.herokuapp.com/word?length=5";
  public randomWord = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getRandomWord(): Observable<string> {
    this.http.get<string[]>(this.apiURL).subscribe((words: string[]) => {
      this.randomWord.next(words[0]);
    });
    return this.randomWord.asObservable();
  }
}
