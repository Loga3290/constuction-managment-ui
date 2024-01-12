import { Component } from '@angular/core';
import { Site } from '../domain/Site';
import { HttpService } from '../services/httpservice';
import { Message } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css'],
})
export class SiteComponent {

  siteDialog: boolean;

  sites: Site[] = [];

  site: Site;

  selectedSites: Site[];

  submitted: boolean;

  statuses: any[];
  items: any;
  router : Router;
  constructor(router:Router, private siteService: HttpService, private messageService: MessageService, private confirmationService: ConfirmationService) { 
    this.router = router
  }

  ngOnInit() {
    this.getSite();
  }

  private getSite() {
    this.siteService.getSites()
      .subscribe(
        res => {
          this.sites = res;
        },
        err => console.log(err)
      );
  }

  openNew() {
    this.site = {};
    this.submitted = false;
    this.siteDialog = true;
  }

  editProduct(site: Site) {
    this.site = site;
    this.siteDialog = true;
  }
  showDetailDialog(siteId : string){
    this.router.navigate(['/sitedetails?siteId=123']);
  }

  deleteProduct(site: Site) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + site.clientName + site.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.siteService.deleteSite(site.id).subscribe(
          res => {
            this.getSite();
          },
          err => console.log(err)
        )
        this.site = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.siteDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    if(this.site.clientName == undefined || this.site.clientName == null
      || this.site.accountNo == undefined || this.site.accountNo == null
      || this.site.bankName == undefined || this.site.bankName == null
      || this.site.location == undefined || this.site.location == null
      ){
        return
      }
    if (this.site.clientName.trim()) {

      this.siteService.saveSites(this.site).subscribe(
        res => {
          this.getSite();
          if (this.site.id) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Site Updated', life: 3000 });
          }
          else {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Site Created', life: 3000 });
          }
          this.siteDialog = false;
          this.site = {};
        },
        err => console.log(err)
      )

      
    }
  }


}
