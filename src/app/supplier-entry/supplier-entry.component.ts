import { Component } from '@angular/core';
import { SupplierEntry } from '../domain/supplierentry';
import { FormControl, FormGroup } from '@angular/forms';
import { Supplier } from '../domain/supplier';
import { Site } from '../domain/Site';
import { DatePipe } from '@angular/common';
import { HttpService } from '../services/httpservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Material } from '../domain/material';

@Component({
  selector: 'app-supplier-entry',
  templateUrl: './supplier-entry.component.html',
  styleUrls: ['./supplier-entry.component.css']
})
export class SupplierEntryComponent {
  entryDialog: boolean;

  entrys: SupplierEntry[] = [];

  entry: SupplierEntry;

  selectedEntrys: SupplierEntry[];
  checked: boolean = false;
  submitted: boolean;
  formGroup: FormGroup | undefined;
  statuses: any[];
  items: any;
  date: Date | undefined;
  suppliers: Supplier[];
  selectedSupplier: Supplier | undefined;
  materials: Material[];
  selectedMaterial: Material | undefined;
  units: number;
  sites: Site[];
  selectedSite: Site | undefined;
  selectedId: string;
  constructor(private datePipe: DatePipe, private httpService: HttpService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getEntry();
    this.getSupplier();
    this.getSite();
    this.getMaterials();
  }

  private getEntry() {
    this.httpService.getSupplierEntrys()
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
  private getSupplier() {
    this.httpService.getSuppliers()
      .subscribe(
        res => {
          this.suppliers = res;
        },
        err => console.log(err)
      );
  }
  private getMaterials() {
    this.httpService.getMaterials()
      .subscribe(
        res => {
          this.materials = res;
        },
        err => console.log(err)
      );
  }

  openNew() {
    this.entry = {};
    this.submitted = false;
    this.entryDialog = true;
  }

  editProduct(entry: SupplierEntry) {
    this.selectedSite = entry.site;
    this.selectedSupplier = entry.supplier
    this.date = new Date(entry.date)
    this.entryDialog = true;
    this.selectedId = entry.id
  }

  deleteProduct(entry: SupplierEntry) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this entry ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpService.deleleSupplierEntry(entry.id).subscribe(
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
    this.submitted = true;
    this.entry.site ={};
    this.entry.id = this.selectedId
    this.entry.supplier = {};
    this.entry.site.id = this.selectedSite.id;
    this.entry.supplier.id = this.selectedSupplier.id;
    this.entry.date = this.datePipe.transform(this.date,"yyyy-MM-dd")
    this.entry.material = this.selectedMaterial;
    this.entry.units = this.units;
    this.httpService.saveSupplierEntrys(this.entry).subscribe(
      res => {
        this.getEntry();
        if (this.entry.id) {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Supplier Updated', life: 3000 });
        }
        else {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Supplier Created', life: 3000 });
        }
        this.entryDialog = false;
        this.entry = {};
        this.selectedId = null;
        this.selectedMaterial = {};
        this.selectedSite = {};
        this.selectedSupplier = {};
        this.units = null;
        this.date = null;
      },
      err => console.log(err)
    )

    
  }

}
