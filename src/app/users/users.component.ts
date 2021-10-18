import { Component, OnInit } from '@angular/core';
import {
  Col,
  DropdownOption,
  FormField,
} from '../components/dinamyc-crud/dinamyc-crud.component';
import { UsersService } from './users.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public columnsToDisplay = ['name', 'email', 'rol', 'options'];

  public cols: Col[] = [
    { header: 'NOMBRE', field: 'name' },
    { header: 'CORREO', field: 'email' },
    { header: 'ROL', field: 'rol' },
  ];

  public formFields: FormField[] = [
    { name: 'first_name', label: 'Nombres' },
    { name: 'last_name', label: 'Apellidos' },
    { name: 'email', label: 'Correo Electrónico' },
  ];

  public origin = 'users';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.roles$
      .pipe(
        map((roles) =>
          roles.map<DropdownOption>((rol) => ({
            label: rol.name,
            value: rol.id,
          }))
        )
      )
      .subscribe((roles) => {
        console.log(roles);

        const field: FormField = {
          name: 'rol_id',
          label: 'Rol',
          type: 'dropdown',
          options: roles,
        };
        this.formFields.push(field);
      });
  }
}
