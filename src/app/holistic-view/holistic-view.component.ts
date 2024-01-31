import { Component } from '@angular/core';
import { HttpService } from '../services/httpservice';
import { Site } from '../domain/Site';
import { Entry } from '../domain/entry';
import { ForemanDetail } from '../domain/foremanDetail';
import { Foreman } from '../domain/foreman';
import { LabourDetail } from '../domain/labourDetail';

@Component({
  selector: 'app-holistic-view',  
  templateUrl: './holistic-view.component.html',
  styleUrls: ['./holistic-view.component.css']
})
export class HolisticViewComponent {


  foremans: Foreman[];
  sites: Site[];
  selectedSites: Site[];
  selectedSitesString: string[] = [' ', 'site1'];
  selectedForemans: Foreman[];
  selectedForeman: Foreman;
  entries: Entry[] = [];
  foremanDetails: ForemanDetail[] = [];
  days: Date[] = [];
  constructor(private productService: HttpService) { }
  currentDay: Date = new Date;
  ngOnInit() {
    this.getForemans();
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

  private getForemans() {
    this.productService.getForemans()
      .subscribe(
        res => {
          this.foremans = res;
          this.selectedForemans = res;
        },
        err => console.log(err)
      );
  }

  generateTable() {
    this.foremanDetails = [];
    this.productService.getEntries(this.selectedSites, this.selectedForemans, this.days[0], this.days[6])
      .subscribe(
        res => {
          this.entries = res;

          
          this.selectedSites.forEach(selectedSite => {
            let foremanDetail: ForemanDetail = {};
            foremanDetail.labourDetails = [];
            foremanDetail.siteName = selectedSite.clientName;
            let selectedSiteEntries = this.entries.filter(entry => {
              return entry.site.id == selectedSite.id
            })
            let distinctLabourTypes = [...new Set(selectedSiteEntries.map(item => item.labourType.name))];
            let labourTypeMap = new Map();
            this.entries.forEach(entry => {
              labourTypeMap.set(entry.labourType.name, entry.labourType.rate)
            })
            
            distinctLabourTypes.forEach( labourType => {
              let labourDtl : LabourDetail = {};
              labourDtl.labourType = labourType
              labourDtl.rate = labourTypeMap.get(labourType)
              labourDtl.day1 = 0
              labourDtl.day2 = 0
              labourDtl.day3 = 0
              labourDtl.day4 = 0
              labourDtl.day5 = 0
              labourDtl.day6 = 0
              labourDtl.day7 = 0
              foremanDetail.labourDetails.push(labourDtl)
            })

            this.days.forEach((day, index) => {
              this.entries.filter(response => {
                  
                  let responseDate = new Date(response.date)
                  responseDate.setHours(0,0,0,0)
                  let dayDate = new Date(day)
                  dayDate.setHours(0,0,0,0)
                  return (responseDate.valueOf() == dayDate.valueOf()
                  && response.foreman.id == this.selectedForeman.id
                    && response.site.id == selectedSite.id)
              }).forEach(entry => {
                let labourDtl = foremanDetail.labourDetails.filter(dtl => entry.labourType.name == dtl.labourType)[0]
               
                switch (index) {
                  case 0: labourDtl.day1 = entry.noOfPersons; break;
                  case 1: labourDtl.day2 = entry.noOfPersons; break;
                  case 2: labourDtl.day3 = entry.noOfPersons; break;
                  case 3: labourDtl.day4 = entry.noOfPersons; break;
                  case 4: labourDtl.day5 = entry.noOfPersons; break;
                  case 5: labourDtl.day6 = entry.noOfPersons; break;
                  case 6: labourDtl.day7 = entry.noOfPersons; break;
                }
              });
              
            })
            this.foremanDetails.push(foremanDetail)
          })
          
          this.foremanDetails.forEach(foremanDtl => {
            let total = 0;
            foremanDtl.labourDetails.forEach(labourDtl =>{
              labourDtl.totalHead = labourDtl.day1 + labourDtl.day2 + labourDtl.day3 + labourDtl.day4 + labourDtl.day5 + labourDtl.day6 + labourDtl.day7
              labourDtl.amount = labourDtl.totalHead * labourDtl.rate
              total += labourDtl.amount;
            })
            foremanDtl.total = total;
          }) 
        });
  }
}
