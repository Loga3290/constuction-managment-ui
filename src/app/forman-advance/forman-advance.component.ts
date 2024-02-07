import { Component } from '@angular/core';
import { ForemanAdvance } from '../domain/foremanadvance';
import { HttpService } from '../services/httpservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Foreman } from '../domain/foreman';

@Component({
  selector: 'app-forman-advance',
  templateUrl: './forman-advance.component.html',
  styleUrls: ['./forman-advance.component.css']
})
export class FormanAdvanceComponent {
  foremanAdvanceDialog: boolean;

  foremanAdvances: ForemanAdvance[] = [];

  foremanAdvance: ForemanAdvance;
  selectedForemanAdvances: ForemanAdvance[];
  selectedForeman : Foreman;
  submitted: boolean;

  statuses: any[];
  items: any;
  foremans: Foreman[] = [];
  constructor(private httpservice: HttpService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getForemanAdvance();
    this.getForeman()
  }
  private getForeman() {
    this.httpservice.getForemans()
      .subscribe(
        res => {
          this.foremans = res;
        },
        err => console.log(err)
      );
  }
  private getForemanAdvance() {
    this.httpservice.getForemanAdvances()
      .subscribe(
        res => {
          this.foremanAdvances = res;
        },
        err => console.log(err)
      );
  }

  openNew() {
    this.foremanAdvance = {};
    this.submitted = false;
    this.foremanAdvanceDialog = true;
  }

  editForemanAdvance(foreman: ForemanAdvance) {
    this.foremanAdvance = foreman;
    this.foremanAdvanceDialog = true;
  }

  deleteForemanAdvance(foremanAdvance: ForemanAdvance) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + foremanAdvance.foreman.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpservice.deleteForemanAdvance(foremanAdvance.id).subscribe(
          () => {
            this.getForemanAdvance();
          },
          err => console.log(err)
        )
        this.foremanAdvance = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.foremanAdvanceDialog = false;
    this.submitted = false;
  }

  saveForemanAdvance() {
    
      this.submitted = true;
      if(this.selectedForeman.id == null || this.selectedForeman.id == undefined ){
        return
      }
      this.foremanAdvance.foreman = this.selectedForeman;
      this.httpservice.saveForemanAdvances(this.foremanAdvance).subscribe(
        () => {
          this.getForemanAdvance();
          if (this.foremanAdvance.id) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Foreman Updated', life: 3000 });
          }
          else {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Foreman Created', life: 3000 });
          }
          this.foremanAdvanceDialog = false;
          this.foremanAdvance = {};
        },
        err => console.log(err)
      )

      
  }

}
