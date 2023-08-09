import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'
import { HttpClient, HttpClientModule } from "@angular/common/http"

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { SearchComponent } from './search/search.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OpenCloseComponent } from './open-close/open-close.component';
import { PaginateComponent } from './paginate/paginate.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';


// définition de la constante pour les routes
const albumsRoutes: Routes = 
[
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: 'albums',component: AlbumsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'album/:albumId', component: AlbumDescriptionComponent },
  { path: 'oc', component: OpenCloseComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    SearchComponent,
    LoginComponent,
    AlbumDescriptionComponent,
    PageNotFoundComponent,
    OpenCloseComponent,
    PaginateComponent,
    AudioPlayerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    /**
     * forRoot est une méthode utilisée pour définir les routes à utiliser dans les modules de rootage
     */
    RouterModule.forRoot(albumsRoutes), //chargement des routes dans l'application
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


