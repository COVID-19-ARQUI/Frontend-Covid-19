import {Dato} from './dato.model';

export interface Dashboard {
  idDepartment: number;
  department: string;
  datoDto: Dato[];
}
