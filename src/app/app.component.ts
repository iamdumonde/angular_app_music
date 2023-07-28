import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: []
})
export class AppComponent {
  title = 'app-music';
  receivedText: string | undefined;

  parentReceive($event: string | undefined){
    this.receivedText = $event;
    console.log('parent : ' + $event);   
  }
}
