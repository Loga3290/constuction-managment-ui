import { Component } from '@angular/core';
import { HttpService } from '../services/httpservice';
import { Foreman } from '../domain/foreman';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-fore-man',
  templateUrl: './fore-man.component.html',
  styleUrls: ['./fore-man.component.css']
})
export class ForeManComponent {
  foremanDialog: boolean;

  foremans: Foreman[] = [];

  foreman: Foreman;
  selectedForemans: Foreman[];

  submitted: boolean;

  statuses: any[];
  items: any;
  constructor(private productService: HttpService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getForeman();
  }

  private getForeman() {
    this.productService.getForemans()
      .subscribe(
        res => {
          this.foremans = res;
        },
        err => console.log(err)
      );
  }

  openNew() {
    this.foreman = {};
    this.submitted = false;
    this.foremanDialog = true;
  }

  editForeman(foreman: Foreman) {
    this.foreman = foreman;
    this.foremanDialog = true;
  }

  deleteForeman(foreman: Foreman) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + foreman.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteForeman(foreman.id).subscribe(
          () => {
            this.getForeman();
          },
          err => console.log(err)
        )
        this.foreman = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.foremanDialog = false;
    this.submitted = false;
  }

  saveForeman() {
    
      this.submitted = true;
      if(this.foreman.name == null || this.foreman.name == undefined 
        || this.foreman.location ==null || this.foreman.location == undefined){
        return
      }
    if (this.foreman.name.trim()) {

      this.productService.saveForemans(this.foreman).subscribe(
        () => {
          this.getForeman();
          if (this.foreman.id) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Foreman Updated', life: 3000 });
          }
          else {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Foreman Created', life: 3000 });
          }
          this.foremanDialog = false;
          this.foreman = {};
        },
        err => console.log(err)
      )

      
    }
  }


}
