import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import axios from 'axios';
import {MatTableDataSource} from '@angular/material/table';

export interface DataCOUNTRIES {
  country_name: string;
  cases: string;
  deaths: string;
  region: string;
  total_recovered: string;
  new_deaths: string;
  new_cases: string;
  serious_critical: string;
  active_cases: string;
  total_cases_per_1m_population: string;
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})

export class CountriesComponent implements AfterViewInit {
  dataCountries: DataCOUNTRIES[] = [];
  displayedColumns: string[] = ['country_name', 'cases', 'deaths', 'total_recovered', 'new_deaths', 'new_cases', 'serious_critical', 'active_cases', 'total_cases_per_1m_population'];
  dataSource: MatTableDataSource<DataCOUNTRIES>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }


  async ngAfterViewInit() {
    await this.data();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async data() {
    const options = {
      headers: {
        'x-rapidapi-key': 'a066813794msh04c81690e3bac14p1f5223jsnba955b90169e',
        'x-rapidapi-host': 'corona-virus-world-and-india-data.p.rapidapi.com'
      }
    };
    await axios.get('https://corona-virus-world-and-india-data.p.rapidapi.com/api', options).then((response) => {
      this.dataCountries = response.data.countries_stat;
      this.dataSource = new MatTableDataSource(this.dataCountries);
      // this.concatData(r);
    }).catch((error) => {
      console.error(error);
    });
  }

  concatData(r) {
    for (const val of r) {
      this.dataCountries.push(val);
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
