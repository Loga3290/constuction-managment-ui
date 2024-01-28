import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from './services/httpservice';
import { MenuItem } from 'primeng/api';

import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ConfirmationService, MessageService, HttpService]
})
export class AppComponent implements OnInit {
    
    menuItems: MenuItem[];
    showLabour: boolean = true;
    showEntry: boolean = false;
    showSite: boolean = false;
    showHolisticView: boolean = false;
    router: Router;
    constructor(router:Router) {
        router.navigate(['/foreman']);
      }
    ngOnInit() {

        
        this.menuItems = [{
            label: 'Menu',
            items: [
                { label: 'Labours', icon: 'pi pi-plus', url: 'https://primeng.org' },
                { label: 'Sites', icon: 'pi pi-download', routerLink: ['/menu'] },
                { label: 'Entry', icon: 'pi pi-download', routerLink: ['/pagename'], queryParams: { 'recent': 'true' } }
            ]
        }];
    }

    showLabourSection() {
        this.showLabour = true;
        this.showEntry = false;
        this.showSite = false;
        this.showHolisticView = false;
    }
    showEntrySection() {
        this.showLabour = false;
        this.showEntry = true;
        this.showSite = false;
        this.showHolisticView = false;
    }
    showSiteSection() {
        this.showLabour = false;
        this.showEntry = false;
        this.showSite = true;
        this.showHolisticView = false;
    }
    showHolisticViewSection() {
        this.showLabour = false;
        this.showEntry = false;
        this.showSite = false;
        this.showHolisticView = true;
    }
}
