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
import { DepartmentComponent } from './pages/department/department.component';
import {ChartsModule} from 'ng2-charts';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    HomeComponent,
    SideBarComponent,
    MainComponent,
    DashboardsComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    ChartsModule,
    MatRippleModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,

  ],
  entryComponents: [],
})
export class HomeModule { }
