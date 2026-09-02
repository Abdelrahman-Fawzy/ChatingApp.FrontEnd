import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() formControlName: string = '';
  @Input() maxDate: string = '';
  @Input() minDate: string = '';

  constructor(@Self() private ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(value: any): void {
    // Implementation for writing value
  }

  registerOnChange(fn: (value: any) => void): void {
    // Implementation for registering change listener
  }

  registerOnTouched(fn: () => void): void {
    // Implementation for registering touch listener
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
