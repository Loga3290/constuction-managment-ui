import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Labour } from '../domain/labour';
import { Observable } from 'rxjs';
import { Site } from '../domain/Site';
import { Entry } from '../domain/entry';
import { EntryRequest } from '../domain/entryrequest';
import { SupplierEntry } from '../domain/supplierentry';
import { Material } from '../domain/material';
import { Supplier } from '../domain/supplier';
import { SupplierEntryRequest } from '../domain/supplierentryrequest';

@Injectable()
export class HttpService {
    deleleSupplierEntry(id: string) {
        return this.http.delete<any>('http://localhost:8080/supplierentry/id/' + id);
    }
    getSupplierEntries(sites: Site[], selectedSuppliers: Supplier[], fromDate: Date, toDate: Date) {
        let entryRequest : SupplierEntryRequest = {};
        entryRequest.fromDate = getDateString(fromDate);
        entryRequest.toDate = getDateString(toDate);
        entryRequest.siteIds = sites.map(site => site.id);
        entryRequest.supplierIds = selectedSuppliers.map(suppplier => suppplier.id);
        return this.http.post<any>('http://localhost:8080/supplierentries', entryRequest);
    }
    getSupplierEntriesForSite(siteId: string) {
        const options = siteId ?
        { params: new HttpParams().set('siteId', siteId) } : {};
        return this.http.get<any>('http://localhost:8080/supplierentries', options);
    }
    getSupplierEntrys() {
        return this.http.get<any>('http://localhost:8080/supplierentry/all');
    }
    saveSuppliers(supplier: Supplier) {
        return this.http.post<any>('http://localhost:8080/supplier', supplier);
    }
    deleteSupplier(id: string) {
        return this.http.delete<any>('http://localhost:8080/supplier/id/' + id);
    }
    getSuppliers() {
        return this.http.get<any>('http://localhost:8080/supplier/all');
    }
    saveMaterials(material: Material) {
        return this.http.post<any>('http://localhost:8080/material', material);
    }
    deleteMaterial(id: string) {
        return this.http.delete<any>('http://localhost:8080/material/id/' + id);
    }
    getMaterials() {
        return this.http.get<any>('http://localhost:8080/material/all');
    }
    saveSupplierEntrys(entry: SupplierEntry) {
        return this.http.post<any>('http://localhost:8080/supplierentry', entry);
    }

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

    getSites(): Observable<Site[]> {
        return this.http.get<any>('http://localhost:8080/site/all');
    }

    saveSites(site: Site): Observable<any> {
        return this.http.post<any>('http://localhost:8080/site', site);
    }

    deleteSite(id: string): Observable<any> {
        return this.http.delete<any>('http://localhost:8080/site/id/' + id);
    }

    editSite(site: Site) {
        return this.http.put<any>('http://localhost:8080/site', site);
    }

    getEntrys(): Observable<Entry[]> {
        return this.http.get<any>('http://localhost:8080/entry/all');
    }
    getEntries(sites: Site[], labours: Labour[], fromDate : Date, toDate : Date): Observable<Entry[]> {
        let entryRequest : EntryRequest = {};
        entryRequest.fromDate = getDateString(fromDate);
        entryRequest.toDate = getDateString(toDate);
        entryRequest.siteIds = sites.map(site => site.id);
        entryRequest.labourIds = labours.map(labour => labour.id);
        return this.http.post<any>('http://localhost:8080/entries', entryRequest);
    }

    saveEntrys(entry: Entry): Observable<any> {
        return this.http.post<any>('http://localhost:8080/entry', entry);
    }

    deleteEntry(id: string): Observable<any> {
        return this.http.delete<any>('http://localhost:8080/entry/id/' + id);
    }

    editEntry(entry: Entry) {
        return this.http.put<any>('http://localhost:8080/entry', entry);
    }
}

function getDateString(fromDate: Date): string {
    
    const yyyy = fromDate.getFullYear();
    let mm = fromDate.getMonth() + 1; // Months start at 0!
    let dd = fromDate.getDate();

    let ddString = (dd < 10) ?  String('0' + dd) : String(dd);
    let mmString = (mm < 10) ?  String('0' + mm) : String(mm);

    return ddString + '/' + mmString + '/' + yyyy;
}
