import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SideBarComponent} from '../../layout/side-bar/side-bar.component';
import {MainComponent} from '../../layout/main/main.component';
import { DashboardsComponent } from './pages/dashboards/dashboards.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {HomeComponent} from './home.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    HomeComponent,
    SideBarComponent,
    MainComponent,
    DashboardsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
  ],
  entryComponents: [],
})
export class HomeModule { }
