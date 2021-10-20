import { Component, OnInit } from '@angular/core';
import {
  Col,
  FormField,
} from '../components/dinamyc-crud/dinamyc-crud.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  public columnsToDisplay = ['name', 'options'];

  public cols: Col[] = [{ header: 'NOMBRE', field: 'name' }];

  public formFields: FormField[] = [{ name: 'name', label: 'Nombre' }];

  public origin = 'brands';
  constructor() {}

  ngOnInit(): void {}
}
