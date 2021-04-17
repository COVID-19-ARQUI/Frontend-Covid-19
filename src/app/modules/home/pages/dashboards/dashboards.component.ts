import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../../../services/dashboard.service';
import {Dashboard} from '../../../../models/dashboard.model';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {
  dashboard:Dashboard[];
  constructor(
    private servicedash: DashboardService
  ) { }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata(): Dashboard[]{
    this.servicedash.getmedia().subscribe(value => {
      this.dashboard=value;
    })
    return this.dashboard;
  }

}
