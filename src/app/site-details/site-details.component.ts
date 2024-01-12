import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { SupplierEntry } from '../domain/supplierentry';
import { HttpService } from '../services/httpservice';
import { MaterialDetail } from '../domain/materialDetail';
import { supplierMaterialDetail } from '../domain/supplierMaterialDetail';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css']
})
export class SiteDetailsComponent {
  siteId: string;
  entryDetails: SupplierEntry[] = [];
  materialDetails: supplierMaterialDetail[] = [];

  constructor(private productService: HttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.entryDetails = [];
    this.materialDetails = [];
    // 'bank' is the name of the route parameter
    this.route.params.subscribe(params => {
      this.siteId = params['id'];
      this.productService.getSupplierEntriesForSite(this.siteId)
        .subscribe(
          res => {
            this.entryDetails = res;
            console.log(this.entryDetails)
            let materialIds = this.entryDetails
              .map((item) => item.material.id)
              .filter(
                (value, index, current_value) => current_value.indexOf(value) === index
              );

            materialIds.forEach(id => {
              let supplierMatDetail: supplierMaterialDetail = {};
              let mat = this.entryDetails.find(entry => entry.material.id == id);
              supplierMatDetail.material = mat.material.name;
              supplierMatDetail.specification = mat.material.specification;
              let sum = this.entryDetails
                .filter(detail => detail.material.id == id)
                .map(entry => entry.units)
                .reduce((sum, current) => sum + current);
              supplierMatDetail.units = sum;
              this.materialDetails.push(supplierMatDetail)
            })

          }
        )
    })
  }


}
