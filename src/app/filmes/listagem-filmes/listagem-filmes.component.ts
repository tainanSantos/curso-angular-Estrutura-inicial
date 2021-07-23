import {Component, OnInit} from '@angular/core';
import {FilmesService} from '../../core/filmes.service';
import {Filme} from '../../shared/models/filme';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfigParams} from '../../shared/models/configParams';
import {debounceTime} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = 'https://i2.wp.com/rotanatural.eco.br/wp-content/uploads/2017/01/sem-foto.gif?ssl=1';

  config: ConfigParams = {
    pagina: 0,
    limite: 4,
  };
  filtroListagem: FormGroup;
  readonly qtdPagina = 4;
  texto: string;
  genero: string;
  filmes: Filme[] = [];
  generos: Array<string>;


  constructor(
    private filmesService: FilmesService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {


    this.filtroListagem = this.fb.group(
      {
        texto: [''],
        genero: ['']

      }
    );

    // isso é para saber se alguem digitou alguma coisa no campo de texto
    //  .pipe(debounceTime(400)) é para ele esperar um tempinho para fazer uma nova consulta
    // a cada tecla teclada ele vai esperar 400 milisecundos para fazer a pesquisa
    this.filtroListagem.get('texto').valueChanges
      .pipe(debounceTime(400))
      .subscribe((valorText: string) => {
        this.config.pesquisa = valorText;
        this.resetarConosulta();
      });

    // isso é para saber se alguem digitou alguma coisa no campo de genero
    this.filtroListagem.get('genero').valueChanges.subscribe((valorGenero: string) => {
      this.config.campo = {tipo: 'genero', valor: valorGenero};
      this.resetarConosulta();
    });
    this.generos = ['Ação', 'Drama', 'Romance', 'Aventura', 'Terror', 'Ficção Científica', 'Comédia'];

    this.listarFilmes();

  }


  public onScroll(): void {
    this.listarFilmes();
  }


  public abrir(id: number): void {
    this.router.navigateByUrl('/filmes/' + id);
  }

  private listarFilmes(): void {
    this.config.pagina++;
    console.log(`PAGINA  --- ${this.config.pagina}`);
    this.filmesService.listar(this.config).subscribe(
      (filmes: Filme[]) => {
        this.filmes.push(...filmes);
      }
    );
  }

  private resetarConosulta(): void {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }

}
