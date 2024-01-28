import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LabourType } from '../domain/labourType';
import { Observable } from 'rxjs';

@Injectable()
export class LabourService {
    
    constructor(private http: HttpClient) { }

    getLabours(): Observable<LabourType[]> {
        return this.http.get<any>('http://localhost:8080/labour/all');

    }
    saveLabours(labour: LabourType): Observable<any> {
        return this.http.post<any>('http://localhost:8080/labour', labour);
    }

    deleteLabour(id: string): Observable<any> {
        return this.http.delete<any>('http://localhost:8080/labour/id/' + id);
    }

    editLabour(labour: LabourType) {
        return this.http.put<any>('http://localhost:8080/labour', labour);
      }
}