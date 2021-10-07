import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core'; 
import { FileUploadComponent } from './file-upload/file-upload.component'; 
import { AppComponent } from './app.component'; 
import { HttpClientModule } from '@angular/common/http'; 
import { FileUploadService } from './service/file-upload.service'; 
import { AngularFileUploaderModule } from "angular-file-uploader";

@NgModule({ 
declarations: [ 
	AppComponent, 
	FileUploadComponent, 
	
], 
imports: [ 
	BrowserModule, 
  HttpClientModule ,
  AngularFileUploaderModule
], 
providers: [ FileUploadService ], 
bootstrap: [AppComponent] 
}) 
export class AppModule { } 
