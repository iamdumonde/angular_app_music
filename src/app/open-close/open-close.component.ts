import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../animation.module';
import { getCurrencySymbol } from '@angular/common';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-open-close',
  templateUrl: './open-close.component.html',
  styleUrls: ['./open-close.component.css'],
  animations: [fadeInAnimation]
})

export class OpenCloseComponent implements OnInit {
 
  /**
   *Observable : c'est en réalité le produit, le message qui sera diffusé
   *le client envoie une requête vers le serveur
   *le serveur va vers la base de donnée
   *la base de donnée revient et donne les données
   *new Observable((observer) => {})
   */
  //Observer : l'élément qui souscrit pour un produit donné, un alert, un message etc


  ngOnInit(): void {
    //On s'abonne à l'observable
    this.myObservable.subscribe((album) => {
      console.log(album);
      
    });
  }

  /**
   * pour créer des observables on peut utiliser new Observable, ou 
   */

  myObservable = new Observable((observer: Observer<string>)=>{
    //le code à executer quand on récupère la donnée
    /**
     * quand quelqu'un s'abonne à mon site envoie tous ses albums ci-dessous
     */
    setTimeout(() => {observer.next("album 1")}, 1000);
    setTimeout(() => {observer.next("album 2")}, 2000);
    setTimeout(() => {observer.next("album 3")}, 3000);
    setTimeout(() => {observer.next("album 4")}, 4000);
    setTimeout(() => {observer.next("album 4")}, 5000);

    console.log("donnée disponible");
  })






  isOpen: boolean = true;
  toggle(){
    this.isOpen = !this.isOpen;
  }

}
