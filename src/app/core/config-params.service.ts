import {Injectable} from '@angular/core';
import {ConfigParams} from '../shared/models/configParams';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  // serviço  responsável por configurações de parâmtros

  constructor() {
  }

  public configurarParametros(config: ConfigParams): HttpParams {
    // configuração para realizar a filtragem no json serve
    let httpParams = new HttpParams();
    // campos de configuração de paginação do json server
    if (config.pesquisa) {
      httpParams = httpParams.set('_page', config.pagina.toString());
    }
    if (config.limite) {
      httpParams = httpParams.set('_limit', config.limite.toString());
    }

    // isso é pq o texto pode vir null
    if (config.pesquisa) {
      httpParams = httpParams.set('q', config.pesquisa);
    }
    // isso é pq o genero pode vir null
    if (config.campo) {
      httpParams = httpParams.set(config.campo.tipo, config.campo.valor.toString());
    }
    // campos de configuração de ordenação do json server
    httpParams = httpParams.set('_sort', 'id');
    httpParams = httpParams.set('_order', 'desc');
    return httpParams;
  }
}
