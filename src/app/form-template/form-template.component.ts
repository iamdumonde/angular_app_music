import { Component } from '@angular/core';
import { Music } from '../music';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})

export class FormTemplateComponent {

  genres = ['Jazz', 'Hip Hop', 'RNB', 'Zouk', 'Trap', 'Twerk', 'Rap', 'AfroPop'];

  //instance de la classe Music dans music.ts
  musicModel = new Music('', '', this.genres[0]);

  submitted = false;

  /**
   * Visité : touched | untouched
   * Change : dirty | pristine
   * Valide : valid | invalid
   * @param form 
   */

  onSubmit(form: any){
    this.submitted = true;
  }
}
