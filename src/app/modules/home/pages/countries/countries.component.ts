import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

export class CountriesComponent implements OnInit {
  dataCountries: DataCOUNTRIES[] = [];
  displayedColumns: string[] = ['country_name', 'cases', 'deaths', 'total_recovered', 'new_deaths', 'new_cases', 'serious_critical', 'active_cases', 'total_cases_per_1m_population'];
  constructor(private http: HttpClient) {
  }

  async ngOnInit(): Promise<any> {
    await this.data();
  }

  async data() {
    const options = {
      headers: {
        'x-rapidapi-key': 'a066813794msh04c81690e3bac14p1f5223jsnba955b90169e',
        'x-rapidapi-host': 'corona-virus-world-and-india-data.p.rapidapi.com'
      }
    };
    var r;
    await axios.get('https://corona-virus-world-and-india-data.p.rapidapi.com/api', options ).then((response) => {
      this.dataCountries = response.data.countries_stat;
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
}
