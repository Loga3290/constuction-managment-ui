import { Component } from '@angular/core';
import { Supplier } from '../domain/supplier';
import { HttpService } from '../services/httpservice';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  supplierDialog: boolean;

  suppliers: Supplier[] = [];

  supplier: Supplier;
  selectedSuppliers: Supplier[];

  submitted: boolean;

  statuses: any[];
  items: any;
  constructor(private productService: HttpService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getSupplier();
  }

  private getSupplier() {
    this.productService.getSuppliers()
      .subscribe(
        res => {
          this.suppliers = res;
        },
        err => console.log(err)
      );
  }

  openNew() {
    this.supplier = {};
    this.submitted = false;
    this.supplierDialog = true;
  }

  editProduct(supplier: Supplier) {
    this.supplier = supplier;
    this.supplierDialog = true;
  }

  deleteProduct(supplier: Supplier) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + supplier.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteSupplier(supplier.id).subscribe(
          res => {
            this.getSupplier();
          },
          err => console.log(err)
        )
        this.supplier = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.supplierDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    if(this.supplier.name == null || this.supplier.name == undefined){
      return
    }
    if (this.supplier.name.trim()) {
      this.productService.saveSuppliers(this.supplier).subscribe(
        res => {
          this.getSupplier();
          if (this.supplier.id) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Supplier Updated', life: 3000 });
          }
          else {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Supplier Created', life: 3000 });
          }
        },
        err => console.log(err)
      )

      this.supplierDialog = false;
      this.supplier = {};
    }
  }

}
