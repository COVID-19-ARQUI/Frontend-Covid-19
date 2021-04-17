
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './layout/main/main.component';
import {DashboardsComponent} from './modules/home/pages/dashboards/dashboards.component';
import {DepartmentComponent} from './modules/home/pages/department/department.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'graphics',
        component: DashboardsComponent,
      },
      {
        path: 'department',
        component: DepartmentComponent,
      },
    ]
  },

  // {
  //   path: 'user',
  //   component: MainComponent,
  //   children: [
  //     {
  //       path: 'myprojects',
  //       component: MyprojectsComponent,
  //     },
  //     {
  //       path: 'feed',
  //       component: FeedComponent,
  //     }
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
