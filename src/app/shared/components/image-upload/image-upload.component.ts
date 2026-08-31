import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
  @Input() loading: boolean = false;
  @Output() uploadFile = new EventEmitter<File>();

  protected imageSrc = signal<string | ArrayBuffer | null | undefined>(null);
  protected isDragging: boolean = false;
  private fileToUpload: File | null = null;

  onUploadFile() {
    if (this.fileToUpload) {
      this.uploadFile.emit(this.fileToUpload);
    }
  }
  onCancel() {
    this.fileToUpload = null;
    this.imageSrc.set(null);
  }
  onDrop(event: DragEvent) {
    event?.preventDefault();
    event?.stopPropagation();
    this.isDragging = false;
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.previewImage(file);
      this.fileToUpload = file;
    }
  }
  onDragLeave(event: DragEvent) {
    event?.preventDefault();
    event?.stopPropagation();
    this.isDragging = false;
  }
  onDragOver(event: DragEvent) {
    event?.preventDefault();
    event?.stopPropagation();
    this.isDragging = true;
  }

  private previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => this.imageSrc.set(e?.target?.result);
    reader.readAsDataURL(file);
  }
}
