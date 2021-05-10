import {Data} from './data.model';

export interface Dashboard {
  idDepartment: number;
  department: string;
  dataDto: Data[];
}
