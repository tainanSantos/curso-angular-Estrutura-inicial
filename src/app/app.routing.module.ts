import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FilmesModule} from './filmes/filmes.module';
import {CadastroFilmesComponent} from './filmes/cadastro-filmes/cadastro-filmes.component';
import {ListagemFilmesComponent} from './filmes/listagem-filmes/listagem-filmes.component';
import {VisualizarfilmesComponent} from './filmes/visualizarfilmes/visualizarfilmes.component';


//  a parte de children das rotas
//  da pra gente implementar no projeto de extensão
const routes: Routes = [

  {
    path: '',
    redirectTo: 'filmes',
    pathMatch: 'full'
  },

  {
    path: 'filmes',
    children: [
      {
        path: '',
        component: ListagemFilmesComponent
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            component: CadastroFilmesComponent,
          }, {
            path: ':id',
            component: CadastroFilmesComponent,
          }
        ]

      },
      {
        path: ':id',
        component: VisualizarfilmesComponent
      },
    ]
  },
  {path: '**', redirectTo: 'filmes'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FilmesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
