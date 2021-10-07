import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FileUploadService { 
	
// API url 
baseApiUrl = "https://file.io"
	
constructor(private http:HttpClient) { } 

public objectFile: Subject<any> = new Subject<any>();
  public cleanFile: Subject<any> = new Subject<any>();

  getObjetFile() {
    return this.objectFile;
  }

  setObjectFile(object: any) {
    return this.objectFile.next(object);
  }
  getCleanUpload() {
    return this.cleanFile;
  }

  setCleanUpload(clean: any) {
    return this.cleanFile.next(clean);
  }

// Returns an observable 
upload(file):Observable<any> { 

	// Create form data 
	const formData = new FormData(); 
		
	// Store form name as "file" with file data 
	formData.append("file", file, file.name); 
		
	// Make http post request over api 
	// with formData as req 
	return this.http.post(this.baseApiUrl, formData) 
} 
} 
