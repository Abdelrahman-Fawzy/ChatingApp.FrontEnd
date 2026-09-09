import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MemberParams } from '../../types/paginations';

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss'],
})
export class ModalFilterComponent {
  @ViewChild('filterModal') modalRef!: ElementRef<HTMLDialogElement>;

  @Output() closeModal: any = new EventEmitter<void>();
  @Output() filterChanged: EventEmitter<MemberParams> =
    new EventEmitter<MemberParams>();

  @Input() memberParams: MemberParams = new MemberParams();

  openModal() {
    this.modalRef.nativeElement.showModal();
  }

  onCloseModal() {
    this.modalRef.nativeElement.close();
    // this.closeModal.emit();
  }

  onFilterChanged() {
    this.filterChanged.emit(this.memberParams);
    this.onCloseModal();
  }

  onMinAgeChange() {
    if (this.memberParams.minAge < 18) this.memberParams.minAge = 18;
  }

  onMaxAgeChange() {
    if (this.memberParams.maxAge < this.memberParams.minAge) {
      this.memberParams.maxAge = this.memberParams.minAge;
    }
  }
}
