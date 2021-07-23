import {CampoGenerico} from './campoGenerico';

export interface ConfigParams {
  pagina?: number;
  limite?: number;
  pesquisa?: string;
  campo?: CampoGenerico;
}
