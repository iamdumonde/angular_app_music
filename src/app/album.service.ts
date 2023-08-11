import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album, List, SortAlbumCallback } from './album';

// Import lodash
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class AlbumService {
  //Subject créé pour gérer le component audio-player
  subjectAlbum = new Subject<Album>();

  private _albumsUrl: string = environment.albumUrl; //convention Private & Protected
  private _albumListUrl: string = environment.albumListUrl;

  //observable qui notifie aux abonnés la page actuelle
  sendCurrentNumberPage = new Subject<number>();

  constructor(private http: HttpClient) { }

  /**
   * Fonction de recherche de tous les albums
   * @returns la liste de tous les albums
   */
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this._albumsUrl).pipe(
      //ordonner les albums par ordre de durée décroissante
      map(albums => {        
        return albums.sort(((a: Album, b: Album) => b.duration - a.duration))
      })
    )
  }


  /**
   * 
   * @param id identifiant de l'album à rechercher
   * @returns returns la liste 
   */
  getAlbum(id: string | null): Observable<Album> | undefined {
    return this.http.get<Album>(this._albumsUrl + '/' + id)
      .pipe(
        map((album: Album) => album)
      );
  }

  /**
   * Fonctions de recherche des sons d'un album
   * @param id  identifiant de l'album à rechercher
   * @returns 
   */
  getAlbumList(id: string): Observable<List> {
    return this.http.get<List>(this._albumListUrl + '/' + id);
  }

  /**
   * Fonction qui returne le nombre albums
   * @returns le nombre d'albums
   */
  count(): Observable<number> {
    return this.http.get<Album[]>(this._albumsUrl).pipe(
      map(
        (albums: Album[]) => albums.length)
    );
  }

  // order(callback: SortAlbumCallback): AlbumService {
  //   this._albums.sort(callback)
  //   return this; //retourne le service pour permettere le chainage de méthode
  // }

  // limit(start: number, end: number): AlbumService {
  //   this._albums = this._albums.slice(start, end);
  //   return this;
  // }

  paginate(start: number, end: number): Observable<Album[]> {
    return this.http.get<Album[]>(this._albumsUrl).pipe(
      map((albums: Album[]) => {
        const res = _.values(albums)
        console.log('sans lodash', albums);
        console.log('avec lodash' , res); 
        
        /**
         * retourne un tableau [
         * {
         *  "O" = {id: , title: "titre"}
         * }
         * ]
         */
        return res;
      }),

      map((albums) => albums
        .sort((a, b) => b.duration - a.duration)
        .slice(start, end))
    );
  }


  /**
   * Type de requête
   * 
   * get => récupérer une ressource 
   * post => envoyer une ressource
   * put => m-à-j une ressource
   * @param word 
   * @returns 
   */
  search(word: string): Observable<Album[]> {
    return this.http.get<Album[]>(this._albumsUrl).pipe(
      map((albums: Album[]) => {
        //parcourir le tableau d'album
        return albums.filter(album => {
          //retourner ceux contenant le string de la variable "word"
          return album.title
            .toLowerCase()
            .includes(word.trim().toLowerCase());//trim(): supprime les espaces avant et après d'un mot
        });
      })
    )
  }

  /** Paginate
   * Méthode qui ramène le nombre d'album qu'on aura par page
   */
  paginateNumberPage(): number {
    return environment.numberPage;
  }

  /**
   * Méthode qui signale à tous les composants la page actuelle
   * @param numberPage numéro de la page actuelle
   */
  currentPage(numberPage: number) {
    return this.sendCurrentNumberPage.next(numberPage);
  };


  //Partie concernant le composant AudioPlayer
  /**
   * Méthode qui permet de changer le statut d'un album à ON
   * @param album L'album dont le statut doit passer à ON
   */
  switchOn(album: Album): void {
    //put('localhost:3000/albums/1', album);
    album.status = 'on';
    //le code ci-dessous s'execute car on y souscrit
    this.http.put<void>(this._albumsUrl + '/' + album.id, album).subscribe({
      next: (e) => console.log(e),
      error: (err) => console.warn(err),
      complete: () => this.subjectAlbum.next(album)
    })
  }

  /**
   * Méthode qui permet de changer le statut d'un album à OFF
   * @param album L'album dont le statut doit passer à OFF
   */
  switchOff(album: Album):void { 
    album.status ="off";
    /**
     * renvoie un observable , et ne s'execute  
     * donc qu'à la souscription
     * du coup il faut souscrire pour l'exécuter
     */
    this.http.put<void>(this._albumsUrl + '/' + album.id, album)
    .subscribe(() => {});
    // this.http.put<void>(`${this._albumsUrl}/${album.id}`, album)
  }
}


