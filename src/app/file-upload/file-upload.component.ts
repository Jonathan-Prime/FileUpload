import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUploadService } from '../service/file-upload.service'; 

@Component({ 
	selector: 'app-file-upload', 
	templateUrl: './file-upload.component.html', 
	styleUrls: ['./file-upload.component.css'] 
}) 
export class FileUploadComponent implements OnInit { 

  @Output() setModalState: EventEmitter<any> = new EventEmitter();
  @Input() nameFile = '';
  @Input() extensions = '';
  @Input() drageable = false;
  public progressBar = '0%';
  public dragHover = false;
  public textFileUpload = '';
  public acceptExtensions =
    '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls, .xlsx';
    shortLink: string = ""; 
    loading: boolean = false; // Flag variable 
    file: File = null; // Variable to store file 


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `components.common.file_upload.${key}`;
  }
  constructor(public fileUploadService: FileUploadService ) {
    this.fileUploadService.getCleanUpload().subscribe(clean => {
      if (clean) {
        this.progressBar = '0%';
        this.textFileUpload = '';
      }
    });
  }
  onUpload() { 
    this.loading = !this.loading; 
    console.log(this.file); 
    this.fileUploadService.upload(this.file).subscribe( 
        (event: any) => { 
            if (typeof (event) === 'object') { 

                // Short link via api response 
                this.shortLink = event.link; 

                this.loading = false; // Flag variable  
            } 
        } 
    ); 
} 

  ngOnInit() {
    if (this.extensions !== '') {
      this.acceptExtensions = this.extensions;
    }

    this.progressBar = '0%';
    this.textFileUpload = '';
  }

  clickFile() {
    document.getElementById(this.nameFile).click();
  }

  onChange(event) { 
    this.file = event.target.files[0]; 
} 

  fileEvent(e) {
    const target = event.target;
        if (target && e.target.files[0]) {
          /*Maximum allowed size in bytes 5MB*/
          const maxAllowedSize = 5 * 1048576;
          if (e.target.files[0].size > maxAllowedSize) {
            this.setModalState.emit(false);
            // tslint:disable-next-line: no-unused-expression
            e.target.files[0] = '';

          }
      }
    const file = e.currentTarget.value;
    const fileName = file.split('\\')[file.split('\\').length - 1];
    this.textFileUpload = fileName.toString();
    if (this.textFileUpload === fileName.toString()) {
      for (let i = 0; i < 101; i++) {
        setTimeout(() => {
          this.progressBar = i.toString() + '%';
        }, 500);
      }
    }
    if (this.textFileUpload === '') {
      this.progressBar = '0%';
    }

    this.fileUploadService.setObjectFile(e.target.files[0]);
  }

  onDrop(event) {
    if (this.drageable) {
      event.preventDefault();
      this.dragHover = false;
      const fileList = event.dataTransfer.files;
      if (fileList.length > 0) {
        Array.from(fileList).map(
          (file: File, key): any => {
            setTimeout(() => {
              this.textFileUpload = file.name.toString();
              this.fileUploadService.setObjectFile(file);
              let i = 0;
              const max = 100;
              const interval = setInterval(() => {
                const increment = 20;
                if (i >= max) {
                  if (i >= max + increment * 2) {
                    clearInterval(interval);
                    this.progressBar = '0%';
                    if (fileList.length - 1 === key) {
                      this.textFileUpload = '';
                    }
                  }
                  i += increment;
                } else if (i < max) {
                  this.progressBar =
                    (i = Math.min(
                      Math.max(i + increment, 0),
                      max,
                    )).toString() + '%';
                }
              }, 50);
            }, 200 * key);
          },
        );
      }
    }
  }

  onDragOver(event) {
    if (this.drageable) {
      this.dragHover = true;
      event.stopPropagation();
      event.preventDefault();
    }
  }
}
