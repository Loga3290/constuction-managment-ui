import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LabourType } from '../domain/labourType';
import { Observable } from 'rxjs';
import { Site } from '../domain/Site';
import { Entry } from '../domain/entry';
import { EntryRequest } from '../domain/entryrequest';
import { SupplierEntry } from '../domain/supplierentry';
import { Material } from '../domain/material';
import { Supplier } from '../domain/supplier';
import { SupplierEntryRequest } from '../domain/supplierentryrequest';
import { environment } from 'src/environments/environment';
import { Foreman } from '../domain/foreman';
import { ForemanAdvance } from '../domain/foremanadvance';

@Injectable()
export class HttpService {

    baseUrl = environment.serviceBaseUrl;
    saveForemans(foreman: Foreman): Observable<any> {
        return this.http.post<any>(environment.serviceBaseUrl + '/foreman', foreman);
    }

    deleteForeman(id: string): Observable<any> {
        return this.http.delete<any>(environment.serviceBaseUrl + '/foreman/id/' + id);
    }
    getForemanAdvancesForForeman(id: string): Observable<Foreman[]> {
        let params = new HttpParams();
        params = params.append('foremanId', id);
        return this.http.get<any>(environment.serviceBaseUrl + '/foreman/advance', {params: params});
    }
    getForemans(): Observable<Foreman[]> {
        return this.http.get<any>(environment.serviceBaseUrl + '/foreman/all');
    }
    deleleSupplierEntry(id: string) {
        return this.http.delete<any>(environment.serviceBaseUrl + '/supplierentry/id/' + id);
    }
    getSupplierEntries(sites: Site[], selectedSuppliers: Supplier[], fromDate: Date, toDate: Date) {
        let entryRequest: SupplierEntryRequest = {};
        entryRequest.fromDate = getDateString(fromDate);
        entryRequest.toDate = getDateString(toDate);
        entryRequest.siteIds = sites.map(site => site.id);
        entryRequest.supplierIds = selectedSuppliers.map(suppplier => suppplier.id);
        return this.http.post<any>(environment.serviceBaseUrl + '/supplierentries', entryRequest);
    }
    getSupplierEntriesForSite(siteId: string) {
        const options = siteId ?
            { params: new HttpParams().set('siteId', siteId) } : {};
        return this.http.get<any>(environment.serviceBaseUrl + '/supplierentries', options);
    }
    getSupplierEntrys() {
        return this.http.get<any>(environment.serviceBaseUrl + '/supplierentry/all');
    }
    saveSuppliers(supplier: Supplier) {
        return this.http.post<any>(environment.serviceBaseUrl + '/supplier', supplier);
    }
    deleteSupplier(id: string) {
        return this.http.delete<any>(environment.serviceBaseUrl + '/supplier/id/' + id);
    }
    getSuppliers() {
        return this.http.get<any>(environment.serviceBaseUrl + '/supplier/all');
    }
    saveMaterials(material: Material) {
        return this.http.post<any>(environment.serviceBaseUrl + '/material', material);
    }
    deleteMaterial(id: string) {
        return this.http.delete<any>(environment.serviceBaseUrl + '/material/id/' + id);
    }
    getMaterials() {
        return this.http.get<any>(environment.serviceBaseUrl + '/material/all');
    }
    saveSupplierEntrys(entry: SupplierEntry) {
        return this.http.post<any>(environment.serviceBaseUrl + '/supplierentry', entry);
    }

    constructor(private http: HttpClient) { }

    getLabourTypes(): Observable<LabourType[]> {
        return this.http.get<any>(environment.serviceBaseUrl + '/labourType/all');

    }
    saveLabours(labour: LabourType): Observable<any> {
        return this.http.post<any>(environment.serviceBaseUrl + '/labourType', labour);
    }

    deleteLabour(id: string): Observable<any> {
        return this.http.delete<any>(environment.serviceBaseUrl + '/labourType/id/' + id);
    }

    editLabour(labour: LabourType) {
        return this.http.put<any>(environment.serviceBaseUrl + '/labourType', labour);
    }

    getSites(): Observable<Site[]> {
        return this.http.get<any>(environment.serviceBaseUrl + '/site/all');
    }

    saveSites(site: Site): Observable<any> {
        return this.http.post<any>(environment.serviceBaseUrl + '/site', site);
    }

    deleteSite(id: string): Observable<any> {
        return this.http.delete<any>(environment.serviceBaseUrl + '/site/id/' + id);
    }

    editSite(site: Site) {
        return this.http.put<any>(environment.serviceBaseUrl + '/site', site);
    }

    getEntrys(): Observable<Entry[]> {
        return this.http.get<any>(environment.serviceBaseUrl + '/entry/all');
    }
    getEntries(sites: Site[], labours: Foreman[], fromDate: Date, toDate: Date): Observable<Entry[]> {
        let entryRequest: EntryRequest = {};
        entryRequest.fromDate = getDateString(fromDate);
        entryRequest.toDate = getDateString(toDate);
        entryRequest.siteIds = sites.map(site => site.id);
        entryRequest.foremanIds = labours.map(labour => labour.id);
        return this.http.post<any>(environment.serviceBaseUrl + '/entries', entryRequest);
    }

    saveEntrys(entry: Entry): Observable<any> {
        return this.http.post<any>(environment.serviceBaseUrl + '/entry', entry);
    }

    deleteEntry(id: string): Observable<any> {
        return this.http.delete<any>(environment.serviceBaseUrl + '/entry/id/' + id);
    }

    editEntry(entry: Entry) {
        return this.http.put<any>(environment.serviceBaseUrl + '/entry', entry);
    }

    getForemanAdvances(): Observable<ForemanAdvance[]> {
        return this.http.get<any>(environment.serviceBaseUrl + '/foreman/advance/all');

    }

    deleteForemanAdvance(id: string): Observable<any> {
        return this.http.delete<any>(environment.serviceBaseUrl + '/foreman/id/' + id);
    }
    saveForemanAdvances(foreman: ForemanAdvance): Observable<any> {
        return this.http.post<any>(environment.serviceBaseUrl + '/foreman/advance', foreman);
    }
}

function getDateString(fromDate: Date): string {

    const yyyy = fromDate.getFullYear();
    let mm = fromDate.getMonth() + 1; // Months start at 0!
    let dd = fromDate.getDate();

    let ddString = (dd < 10) ? String('0' + dd) : String(dd);
    let mmString = (mm < 10) ? String('0' + mm) : String(mm);

    return ddString + '/' + mmString + '/' + yyyy;
}
