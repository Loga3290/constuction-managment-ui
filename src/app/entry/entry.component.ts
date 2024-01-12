import { Component } from '@angular/core';
import { Entry } from '../domain/entry';
import { HttpService } from '../services/httpservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Labour } from '../domain/labour';
import { Site } from '../domain/Site';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {
  entryDialog: boolean;

  entrys: Entry[] = [];

  entry: Entry;

  selectedEntrys: Entry[];
  checked: boolean = false;
  submitted: boolean;
  formGroup: FormGroup | undefined;
  statuses: any[];
  items: any;
  date: Date | undefined;
  labours: Labour[];
  selectedLabour: Labour | undefined;
  sites: Site[];
  selectedSite: Site | undefined;
  cities: City[] | undefined;
  constructor(private datePipe: DatePipe, private httpService: HttpService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  selectedId : string;
  ngOnInit() {
    this.getEntry();
    this.getLabour();
    this.getSite();

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];

  this.formGroup = new FormGroup({
      selectedCity: new FormControl<City | null>(null)
  });

  }

  private getEntry() {
    this.httpService.getEntrys()
      .subscribe(
        res => {
          this.entrys = res;
        },
        err => console.log(err)
      );
  }
  private getSite() {
    this.httpService.getSites()
      .subscribe(
        res => {
          this.sites = res;
        },
        err => console.log(err)
      );
  }
  private getLabour() {
    this.httpService.getLabours()
      .subscribe(
        res => {
          this.labours = res;
        },
        err => console.log(err)
      );
  }

  openNew() {
    this.entry = {};
    this.submitted = false;
    this.entryDialog = true;
  }

  editProduct(entry: Entry) {
    this.selectedSite = entry.site;
    this.selectedLabour = entry.labour
    this.checked = entry.overtime
    this.date = new Date(entry.date)
    this.entryDialog = true;
    this.selectedId = entry.id
  }

  deleteProduct(entry: Entry) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this entry ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpService.deleteEntry(entry.id).subscribe(
          res => {
            this.getEntry();
          },
          err => console.log(err)
        )
        this.entry = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.entryDialog = false;
    this.submitted = false;
  }

  saveProduct(id: string) {
    this.entry = {};
    this.entry.id = this.selectedId;
    this.submitted = true;
    this.entry.site ={};
    this.entry.labour = {};
    this.entry.site.id = this.selectedSite.id;
    this.entry.labour.id = this.selectedLabour.id;
    this.entry.date = this.datePipe.transform(this.date,"yyyy-MM-dd")
    this.entry.overtime = this.checked;
    
    this.httpService.saveEntrys(this.entry).subscribe(
      res => {
        this.getEntry();
        if (this.entry.id) {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Labour entry Updated', life: 3000 });
        }
        else {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Labour entry Created', life: 3000 });
        }
        this.entryDialog = false;
        this.entry = {};
        this.selectedId = null;
        this.selectedLabour = {}
        this.selectedSite = {}
        this.date = null;
        this.checked = false
      },
      err => console.log(err)
    )

    
  }





}
