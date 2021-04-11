import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SideBarComponent} from '../../layout/side-bar/side-bar.component';
import {MainComponent} from '../../layout/main/main.component';
import { DashboardsComponent } from './pages/dashboards/dashboards.component';



@NgModule({
  declarations: [
    SideBarComponent,
    MainComponent,
    DashboardsComponent
  ],
  imports: [

  ],
  entryComponents: [],
})
export class HomeModule { }
