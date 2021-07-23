import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {ValidarCamposService} from '../validar-campos.service';

// @ts-ignore
@Component({
  selector: 'dio-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent {


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
