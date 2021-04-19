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
import {MatSliderModule} from '@angular/material/slider';
import {NewdataComponent} from './pages/newdata/newdata.component';
import {DepartmentComponent} from './pages/department/department.component';
import {ChartsModule} from 'ng2-charts';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { PrincipalComponent } from './pages/principal/principal.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import {DateFormatPipe} from '../../shared/date-format.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    SideBarComponent,
    MainComponent,
    DashboardsComponent,
    DepartmentComponent,
    PrincipalComponent,
    DepartmentComponent,
    DashboardsComponent,
    NewdataComponent,
    NoticiasComponent,
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
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatInputModule,
    MatMenuModule
  ],
  entryComponents: [],
})
export class HomeModule { }
