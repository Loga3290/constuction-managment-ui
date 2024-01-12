import { Component } from '@angular/core';
import { Material } from '../domain/material';
import { HttpService } from '../services/httpservice';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {

  materialDialog: boolean;

  materials: Material[] = [];

  material: Material;
  selectedMaterials: Material[];

  submitted: boolean;

  statuses: any[];
  items: any;
  constructor(private productService: HttpService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getMaterial();
  }

  private getMaterial() {
    this.productService.getMaterials()
      .subscribe(
        res => {
          this.materials = res;
        },
        err => console.log(err)
      );
  }

  openNew() {
    this.material = {};
    this.submitted = false;
    this.materialDialog = true;
  }

  editProduct(material: Material) {
    this.material = material;
    this.materialDialog = true;
  }

  deleteProduct(material: Material) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + material.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteMaterial(material.id).subscribe(
          res => {
            this.getMaterial();
          },
          err => console.log(err)
        )
        this.material = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.materialDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    if(this.material.name == null || this.material.name == undefined 
      || this.material.rate ==null || this.material.rate == undefined){
      return
    }
    if (this.material.name.trim()) {

      this.productService.saveMaterials(this.material).subscribe(
        res => {
          this.getMaterial();
          if (this.material.id) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Material Updated', life: 3000 });
          }
          else {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Material Created', life: 3000 });
          }
        },
        err => console.log(err)
      )

      this.materialDialog = false;
      this.material = {};
    }
  }

}
