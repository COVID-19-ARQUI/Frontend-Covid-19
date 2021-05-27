
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './layout/main/main.component';
import {DashboardsComponent} from './modules/home/pages/dashboards/dashboards.component';
import {DepartmentComponent} from './modules/home/pages/department/department.component';
import {PrincipalComponent} from './modules/home/pages/principal/principal.component';
import {NewdataComponent} from './modules/home/pages/newdata/newdata.component';
import {NoticiasComponent} from './modules/home/pages/noticias/noticias.component';
import {DashboardsboliviaComponent} from './modules/home/pages/dashboardsbolivia/dashboardsbolivia.component';
import {DashboardseditComponent} from './modules/home/pages/dashboardsedit/dashboardsedit.component';
import {PredictionsComponent} from './modules/home/pages/predictions/predictions.component';
import {ProfileComponent} from './modules/home/pages/profile/profile.component';
import {AuthGuard} from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/principal',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'principal',
        component: PrincipalComponent,
      },
      {
        path: 'graphics',
        component: DashboardsComponent,
      },
      {
        path: 'department/:id',
        component: DepartmentComponent,
      },
      {
        path: 'data',
        component: NewdataComponent,
      },
      {
        path: 'noticia',
        component: NoticiasComponent
      },
      {
        path: 'dashbolivia',
        component: DashboardsboliviaComponent
      },
      {
        path: 'dashedit',
        component: DashboardseditComponent
      },
      {
        path: 'predict',
        component: PredictionsComponent
      }
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
