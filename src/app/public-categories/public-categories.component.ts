import { Component, OnInit } from '@angular/core';
import { Category } from '../categories/interfaces/categoria.interface';

@Component({
  selector: 'app-public-categories',
  templateUrl: './public-categories.component.html',
  styleUrls: ['./public-categories.component.css'],
})
export class PublicCategoriesComponent implements OnInit {
  categories?: Category[];

  constructor() {}

  ngOnInit(): void {}
}
