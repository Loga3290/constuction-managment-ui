import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Labour } from '../domain/labour';
import { Observable } from 'rxjs';

@Injectable()
export class LabourService {
    
    constructor(private http: HttpClient) { }

    getLabours(): Observable<Labour[]> {
        return this.http.get<any>('http://localhost:8080/labour/all');

    }
    saveLabours(labour: Labour): Observable<any> {
        return this.http.post<any>('http://localhost:8080/labour', labour);
    }

    deleteLabour(id: string): Observable<any> {
        return this.http.delete<any>('http://localhost:8080/labour/id/' + id);
    }

    editLabour(labour: Labour) {
        return this.http.put<any>('http://localhost:8080/labour', labour);
      }
}