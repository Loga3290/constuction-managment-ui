import { Component } from '@angular/core';
import { HttpService } from '../services/httpservice';
import { Labour } from '../domain/labour';
import { Site } from '../domain/Site';
import { Entry } from '../domain/entry';
import { LabourDetail } from '../domain/LabourDetail';

@Component({
  selector: 'app-holistic-view',
  templateUrl: './holistic-view.component.html',
  styleUrls: ['./holistic-view.component.css']
})
export class HolisticViewComponent {


  labours: Labour[];
  sites: Site[];
  selectedSites: Site[];
  selectedSitesString: string[] = [' ', 'site1'];
  selectedLabours: Labour[];
  selectedLabour: Labour;
  entries: Entry[] = [];
  labourDetails: LabourDetail[] = [];
  days: Date[] = [];
  constructor(private productService: HttpService) { }
  currentDay: Date = new Date;
  ngOnInit() {
    this.getLabour();
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

  private getLabour() {
    this.productService.getLabours()
      .subscribe(
        res => {
          this.labours = res;
          this.selectedLabours = res;
        },
        err => console.log(err)
      );
  }

  generateTable() {
    this.labourDetails = [];
    this.productService.getEntries(this.selectedSites, this.selectedLabours, this.days[0], this.days[6])
      .subscribe(
        res => {
          this.entries = res;
          // console.log('entries')
          console.log(this.days)
          this.selectedSites.forEach(selectedSite => {
            var labourDetail: LabourDetail = {};
            labourDetail.siteName = selectedSite.clientName;
            let noOfDays = 0;
            this.days.forEach((day, index) => {
              let resultEntry = this.entries.filter(response => {
                  
                  let responseDate = new Date(response.date)
                  responseDate.setHours(0,0,0,0)
                  let dayDate = new Date(day)
                  dayDate.setHours(0,0,0,0)
                  return (responseDate.valueOf() == dayDate.valueOf()
                  && response.labour.id == this.selectedLabour.id
                    && response.site.id == selectedSite.id)
              });
              let result = resultEntry.length == 0 ? 'O' : resultEntry[0].overtime ? 'X\\': 'X';
              if(result == 'X' || result == 'X\\'){
                noOfDays++;
                if(resultEntry[0].overtime){
                  noOfDays += 0.5;
                }
              }

              switch (index) {
                case 0: labourDetail.day1 = result; break;
                case 1: labourDetail.day2 = result; break;
                case 2: labourDetail.day3 = result; break;
                case 3: labourDetail.day4 = result; break;
                case 4: labourDetail.day5 = result; break;
                case 5: labourDetail.day6 = result; break;
                case 6: labourDetail.day7 = result; break;
              }
            })
            labourDetail.noOfDays = noOfDays;
            labourDetail.amount = noOfDays * this.selectedLabour.rate;
            this.labourDetails.push(labourDetail)
          }
          )
        });
  }
}
