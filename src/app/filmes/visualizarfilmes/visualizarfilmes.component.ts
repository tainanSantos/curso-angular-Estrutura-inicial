import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FilmesService} from '../../core/filmes.service';
import {Filme} from '../../shared/models/filme';
import {Alerta} from '../../shared/models/alerta';
import {MatDialog} from '@angular/material';
import {AlertaComponent} from '../../shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-visualizarfilmes',
  templateUrl: './visualizarfilmes.component.html',
  styleUrls: ['./visualizarfilmes.component.scss']
})
export class VisualizarfilmesComponent implements OnInit {

  filme: Filme;
  readonly semFoto = 'https://i2.wp.com/rotanatural.eco.br/wp-content/uploads/2017/01/sem-foto.gif?ssl=1';
  id: number;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmesService: FilmesService
  ) {
  }

  ngOnInit() {
    // @ts-ignore
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();

  }

  public editar(): void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }

  public excluir(): void {

    const config = {
      data: {
        titulo: 'Você tem cerrteza que deseja excluir?',
        descricao: 'Caso você tenha certeza que deseja excluir, clique no botão OK',
        // btnSucesso: 'Ir para a listagem',
        btnCancelar: 'Cadastrar',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuiBtnFechar: true
      } as Alerta
    };

    const dialogref = this.dialog.open(AlertaComponent, config);
    dialogref.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.filmesService.excluir(this.id).subscribe(
          () => {
            this.router.navigateByUrl('/filmes');
          },
          (error) => {
          }
        );
      }
    });

  }

  private visualizar(): void {
    this.filmesService.visualizar(this.id).subscribe(
      (filme: Filme) => {
        this.filme = filme;
      }
    );
  }


}
