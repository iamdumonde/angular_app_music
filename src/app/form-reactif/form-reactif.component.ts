import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-reactif',
  templateUrl: './form-reactif.component.html',
  styleUrls: ['./form-reactif.component.css']
})

export class FormReactifComponent {
  /**
   * On a fait appel à FormBuilder
   * parce qu'on ne voulait plus utiliser formGroup
   * @param fb 
   */
  constructor(
    private fb: FormBuilder
  ){}
  genres = ['Jazz', 'Hip Hop', 'RNB', 'Zouk', 'Trap', 'Twerk', 'Rap', 'AfroPop'];

  musicForm = this.fb.group({
    name: ['', Validators.minLength(4)],
    auteur: ['', Validators.required],
    style: [this.genres[0]]
  });

  get name(){
    return this.musicForm.get('name');
  }

  get auteur(){
    return this.musicForm.get('auteur');
  }

  get style(){
    return this.musicForm.get('style');
  }

  // search = new FormControl('');

  onSubmit(){
    console.warn(this.musicForm.value);
    
  }

}
