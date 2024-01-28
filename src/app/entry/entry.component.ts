import { Component } from '@angular/core';
import { Entry } from '../domain/entry';
import { HttpService } from '../services/httpservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LabourType } from '../domain/labourType';
import { Site } from '../domain/Site';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Foreman } from '../domain/foreman';
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
  noOfPersons: number = 0;
  submitted: boolean;
  formGroup: FormGroup | undefined;
  statuses: any[];
  items: any;
  date: Date | undefined;
  labourTypes: LabourType[];
  foremans: Foreman[] = [];
  selectedLabourType: LabourType | undefined;
  selectedForeman: Foreman | undefined;
  sites: Site[];
  selectedSite: Site | undefined;
  cities: City[] | undefined;
  constructor(private datePipe: DatePipe, private httpService: HttpService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  selectedId : string;

  ngOnInit() {
    this.getEntry();
    this.getLabourTypes();
    this.getSite();
    this.getForeman();


  this.formGroup = new FormGroup({
      selectedCity: new FormControl<City | null>(null)
  });

  }
  private getForeman() {
    this.httpService.getForemans()
      .subscribe(
        res => {
          this.foremans = res;
        },
        err => console.log(err)
      );
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
  private getLabourTypes() {
    this.httpService.getLabourTypes()
      .subscribe(
        res => {
          this.labourTypes = res;
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
    this.selectedLabourType = entry.labourType
    this.selectedForeman = entry.foreman
    this.noOfPersons = entry.noOfPersons
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

  saveProduct() {
    this.entry = {};
    this.entry.id = this.selectedId;
    this.submitted = true;
    this.entry.site ={};
    this.entry.labourType = {};
    this.entry.foreman = {};
    this.entry.site.id = this.selectedSite.id;
    this.entry.labourType.id = this.selectedLabourType.id;
    this.entry.date = this.datePipe.transform(this.date,"yyyy-MM-dd")
    this.entry.noOfPersons = this.noOfPersons;
    this.entry.foreman.id = this.selectedForeman != undefined ? this.selectedForeman.id : null;


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
        this.selectedLabourType = {}
        this.selectedForeman = {}
        this.selectedSite = {}
        this.date = null;
        this.noOfPersons = 0
      },
      err => console.log(err)
    )

    
  }





}
