import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input } from '@angular/core';
import {ValidarCamposService} from '../validar-campos.service';

@Component({
  selector: 'dio-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {


  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validacao: ValidarCamposService) { }

  // @ts-ignore
  get formControl(): AbstractControl {
    // tslint:disable-next-line:no-unused-expression
    return this.formGroup.controls[this.controlName];
  }

}
