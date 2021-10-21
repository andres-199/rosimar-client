import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Col,
  DropdownOption,
  FormField,
} from '../components/dinamyc-crud/dinamyc-crud.component';
import { ProductsService } from '../products/products.service';
import { Offer } from './interfaces/offer.interface';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  public columnsToDisplay = ['Product', 'options'];

  public cols: Col[] = [{ header: 'PRODUCTO', field: 'Product' }];

  public formFields: FormField[] = [];

  public origin = 'offers';
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.produtcs$
      .pipe(
        map((products) =>
          products.map<DropdownOption>((product) => ({
            label: product.name,
            value: product.id,
          }))
        )
      )
      .subscribe({
        next: (products) => {
          const field: FormField = {
            name: 'product_id',
            label: 'Seleccione el Producto',
            options: products,
            type: 'dropdown',
          };
          this.formFields = [field];
        },
      });
  }

  onLoadDataSource(offers: Offer[]) {
    offers = offers.map((offer) => {
      offer.Product = offer.Product?.name as any;
      return offer;
    });
  }
}
