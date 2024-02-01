import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { AppComponent } from './app.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SiteComponent } from './site/site.component';
import { LabourComponent } from './labour/labour.component';
import { EntryComponent } from './entry/entry.component';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { HolisticViewComponent } from './holistic-view/holistic-view.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { CheckboxModule } from 'primeng/checkbox';
import { MaterialComponent } from './material/material.component';
import { SupplierEntryComponent } from './supplier-entry/supplier-entry.component';
import { SupplierHolisticViewComponent } from './supplier-holistic-view/supplier-holistic-view.component';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './supplier/supplier.component';
import { RouterTestingModule } from "@angular/router/testing";
import { SiteDetailsComponent } from './site-details/site-details.component';
import { ForeManComponent } from './fore-man/fore-man.component';
import { AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderInterceptor } from './services/loaderInterceptor';
const appRoutes: Routes = [
    {path: 'foreman', component: ForeManComponent},
    {path: 'labourType', component: LabourComponent},
    {path: 'site', component: SiteComponent},
    {path: 'material', component: MaterialComponent},
    {path: 'supplier', component: SupplierComponent},
    {path: 'labourentry', component: EntryComponent},
    {path: 'supplierentry', component: SupplierEntryComponent},
    {path: 'holisticview', component: HolisticViewComponent},
    {path: 'supplierholisticview', component: SupplierHolisticViewComponent},
    {path: 'sitedetails/:id', component: SiteDetailsComponent}
  ];

@NgModule({
    declarations: [
        AppComponent,
        SiteComponent,
        LabourComponent,
        EntryComponent,
        HolisticViewComponent,
        MaterialComponent,
        SupplierEntryComponent,
        SupplierHolisticViewComponent,
        SupplierComponent,
        SiteDetailsComponent,
        ForeManComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ToolbarModule,
        ConfirmDialogModule,
        RatingModule,
        InputNumberModule,
        InputTextareaModule,
        RadioButtonModule,
        DropdownModule,
        ButtonModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        PanelModule,
        PanelMenuModule,
        MessagesModule,
        ToastModule,
        CalendarModule,
        MultiSelectModule,
        ListboxModule,
        CheckboxModule,
        RouterTestingModule,
        AccordionModule,
        ProgressSpinnerModule,
        RouterModule.forRoot(
            appRoutes, {enableTracing: true}  
            )
    ],
    providers: [ConfirmationService, DatePipe, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
