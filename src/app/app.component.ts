import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { interval, Observable, map, take } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app-music';
  receivedText: string | undefined;
  
  // timers
  timerObservable!: Observable<string>;
  count!:string;//opérateur de confiance | opérateur d'affirmation de non nullité
  //le Math floor permet de ne s'interesser à la partie décimale

  ngOnInit(): void {
   this.timerObservable = interval(1000).pipe(
    take(3600 * 12),
    map(num => {
      const hours = Math.floor(num / 3600);
      const minutes = Math.floor(num / 60)
      return `${this.format(hours)}h ${this.format(minutes - hours * 60)}min ${this.format(num - minutes * 60)}s`
    })

   );
   this.timerObservable.subscribe(num => {
     this.count = num;
    })
  }

  //méthode using in ngOnit to display the timers
  format(num: number): string {
   return (num < 10 ? '0' : '') + num;
  }

  parentReceive($event: string | undefined){
    this.receivedText = $event;
    console.log('parent : ' + $event);   
  }
}
