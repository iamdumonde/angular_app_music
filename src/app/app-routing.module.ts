import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { LoginComponent } from './login/login.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { OpenCloseComponent } from './open-close/open-close.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlbumComponent } from './admin/album/album.component';


// définition de la constante pour les routes
const albumsRoutes: Routes =
  [
    { path: '', redirectTo: '/albums', pathMatch: 'full' },
    { path: 'albums', component: AlbumsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'album/:albumId', component: AlbumDescriptionComponent },
    { path: 'oc', component: OpenCloseComponent },
    { path: 'admin', component: AlbumComponent },

    // Danger Chien Méchant
    { path: "**", component: PageNotFoundComponent }
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(albumsRoutes), //chargement des routes dans l'application
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
