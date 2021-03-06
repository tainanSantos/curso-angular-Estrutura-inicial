import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() {

  }


  hasErrorValidar(control: AbstractControl, errorName: string): boolean {
    return (control.dirty || control.touched) && this.hasError(control, errorName);
  }

  hasError(control: AbstractControl, errorName: string): boolean {
    return control.hasError(errorName);
  }


  lengtValidar(control: AbstractControl, errorName: string): number {
    const error = control.errors[errorName];
    return error.requiredLength || error.min || error.max || 0;
  }




}
