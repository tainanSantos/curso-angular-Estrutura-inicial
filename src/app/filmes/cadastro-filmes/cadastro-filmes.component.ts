import {ValidarCamposService} from './../../shared/components/campos/validar-campos.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Filme} from '../../shared/models/filme';
import {FilmesService} from '../../core/filmes.service';
import {MatDialog} from '@angular/material';
import {AlertaComponent} from '../../shared/components/alerta/alerta.component';
import {Alerta} from '../../shared/models/alerta';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {
  }


  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.id = this.activateRouter.snapshot.params['id'];
    if (this.id) {
      this.filmeService.visualizar(this.id).subscribe(
        (filme: Filme) => {
          this.criarFomulário(filme);
        }
      );
    } else {
      this.criarFomulário(this.criarFilmeEmBranco());

    }


    this.generos = ['Ação', 'Drama', 'Romance', 'Aventura', 'Terror', 'Ficção Científica', 'Comédia'];

  }


  public submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }
    // alert('Sucesso \n\n' + JSON.stringify(this.cadastro.value, null, 4));
    const filme = this.cadastro.getRawValue() as Filme;

    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.salvar(filme);

    }
  }


  public reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFomulário(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, [Validators.min(10)]],
      genero: [filme.genero, [Validators.required]]
    });
  }

  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      titulo: null,
      dtLancamento: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      urlIMDb: null,
      genero: null
    } as Filme;

  }

  private salvar(filme: Filme): void {
    // @ts-ignore
    this.filmeService.salvar(filme).subscribe(
      (value: Filme) => {
        const config = {
          data: {
            btnSucesso: 'Ir para a listagem',
            btnCancelar: 'Cadastrar novo',
            corBtnCancelar: 'primary',
            possuiBtnFechar: true

          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        // após fechar o dialog a gente vai fazer alguma coisa
        dialogRef.afterClosed().subscribe(
          (opcao: boolean) => {
            if (opcao) {
              this.router.navigateByUrl('filmes');
            } else {
              this.reiniciarForm();
            }
          }
        )
        ;
      },
      error => {
        const config = {
          data: {
            titulo: 'Erro ao salvar o registro',
            descricao: 'Não conseguimos salvar seu registro, favor tentra novamente mais tarde',
            corBtnSucesso: 'warn',
            btnSucesso: 'Fechar',
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }


  private editar(filme: Filme): void {
    // @ts-ignore
    this.filmeService.editar(filme).subscribe(
      (value: Filme) => {
        const config = {
          data: {
            descricao: 'Seu registro foi atualizado com sucesso',
            btnSucesso: 'Ir para a listagem',
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        // após fechar o dialog a gente vai fazer alguma coisa
        dialogRef.afterClosed().subscribe(
          (opcao: boolean) => {
            this.router.navigateByUrl('filmes');
          }
        )
        ;
      },
      error => {
        const config = {
          data: {
            titulo: 'Erro ao editar o registro',
            descricao: 'Não conseguimos editar seu registro, favor tentra novamente mais tarde',
            corBtnSucesso: 'warn',
            btnSucesso: 'Fechar',
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }

}
