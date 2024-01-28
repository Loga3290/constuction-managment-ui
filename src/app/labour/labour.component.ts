
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LabourType } from '../domain/labourType';
import { HttpService } from '../services/httpservice';
@Component({
  selector: 'app-labour',
  templateUrl: './labour.component.html',
  styleUrls: ['./labour.component.css']
})
export class LabourComponent {
  labourDialog: boolean;

  labours: LabourType[] = [];

  labour: LabourType;
  selectedLabours: LabourType[];

  submitted: boolean;

  statuses: any[];
  items: any;
  constructor(private productService: HttpService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getLabour();
  }

  private getLabour() {
    this.productService.getLabourTypes()
      .subscribe(
        res => {
          this.labours = res;
        },
        err => console.log(err)
      );
  }

  openNew() {
    this.labour = {};
    this.submitted = false;
    this.labourDialog = true;
  }

  editProduct(labour: LabourType) {
    this.labour = labour;
    this.labourDialog = true;
  }

  deleteProduct(labour: LabourType) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + labour.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteLabour(labour.id).subscribe(
          res => {
            this.getLabour();
          },
          err => console.log(err)
        )
        this.labour = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.labourDialog = false;
    this.submitted = false;
  }

  saveLabourType() {
    
      this.submitted = true;
      if(this.labour.name == null || this.labour.name == undefined 
        || this.labour.rate ==null || this.labour.rate == undefined){
        return
      }
    if (this.labour.name.trim()) {

      this.productService.saveLabours(this.labour).subscribe(
        res => {
          this.getLabour();
          if (this.labour.id) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Labour Updated', life: 3000 });
          }
          else {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Labour Created', life: 3000 });
          }
          this.labourDialog = false;
          this.labour = {};
        },
        err => console.log(err)
      )

      
    }
  }


}
