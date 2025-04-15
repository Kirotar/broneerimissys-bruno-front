import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderTextService {
  private _text = signal<string>('Tere tulemast broneerimisüsteemi BRuNO!');
  text = this._text.asReadonly();

  setText(newText: string) {
    this._text.set(newText);
  }
}
