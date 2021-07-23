import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Filme} from '../shared/models/filme';
import {ConfigParams} from '../shared/models/configParams';
import {ConfigParamsService} from './config-params.service';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private url = 'http://localhost:3000/filmes/';

  constructor(private http: HttpClient, private configService: ConfigParamsService) {
  }


  public salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(this.url, filme);
  }

  public editar(filme: Filme): Observable<Filme> {
    return this.http.put<Filme>(this.url + filme.id, filme);
  }


  public listar(config: ConfigParams): Observable<Filme[]> {
    const configParams = this.configService.configurarParametros(config);
    return this.http.get<Filme[]>(this.url, {params: configParams});
  }

  public visualizar(id: number): Observable<Filme> {
    return this.http.get<Filme>(this.url + id);
  }

  public excluir(id: number): Observable<void> {
    return this.http.delete<any>(this.url + id);

  }
}
