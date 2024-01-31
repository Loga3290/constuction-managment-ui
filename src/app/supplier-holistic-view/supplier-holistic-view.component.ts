import { Component } from '@angular/core';
import { Supplier } from '../domain/supplier';
import { Site } from '../domain/Site';
import { SupplierEntry } from '../domain/supplierentry';
import { HttpService } from '../services/httpservice';
import { DatePipe } from '@angular/common';
import { SupplierDetail } from '../domain/SupplierDetail';
import { MaterialDetail } from '../domain/materialDetail';

@Component({
  selector: 'app-supplier-holistic-view',
  templateUrl: './supplier-holistic-view.component.html',
  styleUrls: ['./supplier-holistic-view.component.css']
})
export class SupplierHolisticViewComponent {

  suppliers: Supplier[];
  sites: Site[];
  selectedSites: Site[];
  selectedSitesString: string[] = [' ', 'site1'];
  selectedSuppliers: Supplier[];
  selectedSupplier: Supplier;
  entries: SupplierEntry[] = [];
  supplierDetails: SupplierDetail[] = [];
  days: Date[] = [];
  materialDetails: any[] = [];
  detailDialog: boolean = false;
  constructor(private productService: HttpService , public datepipe: DatePipe) { }
  currentDay: Date = new Date;
  ngOnInit() {
    this.getSupplier();
    this.getSite();
    var today = new Date();
    this.currentDay = today;
    this.setDays(today);
  }

  private setDays(currentDay : Date) {
      
      var day1 = new Date();
      day1 = currentDay;
      day1.setDate(day1.getDate() - day1.getDay());
      this.days[0] = new Date(day1.getFullYear() , day1.getMonth(), day1.getDate());
      this.days[1] = new Date(day1.getFullYear() , day1.getMonth(), (day1.getDate() + 1));
      this.days[2] = new Date(day1.getFullYear() , day1.getMonth(), (day1.getDate() + 2));
      this.days[3] = new Date(day1.getFullYear() , day1.getMonth(), (day1.getDate() + 3));
      this.days[4] = new Date(day1.getFullYear() , day1.getMonth(), (day1.getDate() + 4));
      this.days[5] = new Date(day1.getFullYear() , day1.getMonth(), (day1.getDate() + 5));
      this.days[6] = new Date(day1.getFullYear() , day1.getMonth(), (day1.getDate() + 6));
  }

  setPrevWeek() {
    var today = new Date(this.currentDay.getFullYear() , this.currentDay.getMonth() , (this.currentDay.getDate() - 7))
    this.currentDay = today;
    this.setDays(today)
    this.generateTable()
  }

  setNextWeek() {
    var today = new Date(this.currentDay.getFullYear() , this.currentDay.getMonth() , (this.currentDay.getDate() + 7))
    this.currentDay = today;
    this.setDays(today);
    this.generateTable()
  }

  private getSite() {
    this.productService.getSites()
      .subscribe(
        res => {
          this.sites = res;
          this.selectedSites = res
        },
        err => console.log(err)
      );
  }

  private getSupplier() {
    this.productService.getSuppliers()
      .subscribe(
        res => {
          this.suppliers = res;
          this.selectedSuppliers = res;
        },
        err => console.log(err)
      );
  }
  showDetailDialog(id:string){
    this.detailDialog = true;
    this.materialDetails = [];
    this.entries.filter(entry => {
      return (entry.site.id === id) && (entry.supplier.id == this.selectedSupplier.id)
    })
    .forEach(entry => {
      let materialDetail : MaterialDetail = {}
      materialDetail.material = entry.material.name;
      materialDetail.specification = entry.material.specification;
      materialDetail.date = entry.date;
      materialDetail.units = entry.units
      materialDetail.amount = entry.billAmount
      this.materialDetails.push(materialDetail);
    })

  }
  generateTable() {
    this.supplierDetails = [];
    this.productService.getSupplierEntries(this.selectedSites, this.selectedSuppliers, this.days[0], this.days[6])
      .subscribe(
        res => {
          this.entries = res;
          this.selectedSites.forEach(selectedSite => {
            var supplierDetail: SupplierDetail = {};
            supplierDetail.siteName = selectedSite.clientName;
            supplierDetail.siteId = selectedSite.id
            supplierDetail.amount = 0;
            this.days.forEach((day, index) => {
              let resultSupplierEntry = this.entries.filter(response => {
                  
                  let responseDate = new Date(response.date)
                  responseDate.setHours(0,0,0,0)
                  let dayDate = new Date(day)
                  dayDate.setHours(0,0,0,0);

                  
                  return (responseDate.valueOf() == dayDate.valueOf()
                  && response.supplier.id == this.selectedSupplier.id
                    && response.site.id == selectedSite.id)
              });
              let result = resultSupplierEntry.length == 0 ? 'O' : 'X';
              if(result == 'X'){
                resultSupplierEntry.forEach(entry => {
                  supplierDetail.amount += entry.billAmount;
                })
              }

              switch (index) {
                case 0: supplierDetail.day1 = result; break;
                case 1: supplierDetail.day2 = result; break;
                case 2: supplierDetail.day3 = result; break;
                case 3: supplierDetail.day4 = result; break;
                case 4: supplierDetail.day5 = result; break;
                case 5: supplierDetail.day6 = result; break;
                case 6: supplierDetail.day7 = result; break;
              }
            })
            this.supplierDetails.push(supplierDetail)
          }
          )
        });
  }
}
