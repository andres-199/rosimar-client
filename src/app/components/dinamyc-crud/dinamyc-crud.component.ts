import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DinamycFormComponent } from '../dinamyc-form/dinamyc-form.component';
import { CrudService } from './crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface DisableButtonRule {
  action: 'disableDelete' | 'disableEdit';
  where: { attribute: string; value: any };
}

export const Export_Config = {
  fileName: 'filename',
  sheet: 'datos',
  Props: { Author: 'andres199' },
};

export interface Col {
  header: string;
  field: string;
  width?: string;
  type?:
    | 'list'
    | 'array'
    | 'object'
    | 'image'
    | 'date'
    | 'money'
    | 'chips'
    | 'payment-method';
}

export interface FormField {
  name: string;
  label: string;
  type?: 'text' | 'textArea' | 'dropdown' | 'date' | 'file' | 'number';
  options?: DropdownOption[];
}

export interface DropdownOption {
  label: string;
  value: any;
}

export interface MenuOption {
  icon: string;
  label: string;
  handler: (data?: any) => any;
}

@Component({
  selector: 'app-dinamyc-crud',
  templateUrl: './dinamyc-crud.component.html',
  styleUrls: ['./dinamyc-crud.style.css'],
})
export class DinamycCrudComponent implements OnInit {
  @Input()
  disabbleButtonRule?: DisableButtonRule;
  @Input()
  hideDelete = false;
  @Input()
  hideEdit = false;
  @Input()
  hideCreate = false;
  @Input()
  public cols: Col[] = [];
  @Input()
  public columnsToDisplay: string[] = [];
  @Input()
  public formFields: FormField[] = [];
  @Input()
  public origin: string = '';
  @Input()
  public originForm = undefined;
  @Input()
  public menuOptions: MenuOption[] = [];
  @Input()
  public activeHover = false;

  public dataSource: any;
  public exportConfig = Export_Config;

  @ViewChild(MatPaginator, { static: true })
  private paginator?: MatPaginator;

  @Output() onLoadDataSource = new EventEmitter<any>();
  @Output() onClickRow = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    private service: CrudService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getDataSource();
  }

  getDataSource() {
    this.service.findAll(this.origin).subscribe((dataSource) => {
      this.onLoadDataSource.emit(dataSource);
      if (this.disabbleButtonRule) {
        this.setDisableButtonRule(dataSource);
      }

      this.dataSource = new MatTableDataSource<any>(dataSource);
      this.dataSource.paginator = this.paginator;
    });
  }

  private setDisableButtonRule(dataSource: any[]) {
    dataSource = dataSource.map((item) => {
      const attr = this.disabbleButtonRule?.where.attribute;
      const value = this.disabbleButtonRule?.where.value;
      const action = this.disabbleButtonRule?.action;
      if (attr && action) if (item[attr] == value) item[action] = true;
      return item;
    });
  }

  public onEdit(data: any) {
    const ref = this.dialog.open(DinamycFormComponent, {
      data: { data, formFields: this.formFields },
      minWidth: 500,
    });

    ref.afterClosed().subscribe((_data) => {
      if (_data) {
        this.update(_data);
      }
    });
  }

  public onDelete(data: any) {
    const ref = this.dialog.open(DinamycFormComponent, {
      data: { isDelete: true },
      minWidth: 400,
    });

    ref.afterClosed().subscribe((res) => {
      if (res) {
        this.delete(data.id);
      }
    });
  }

  public onRegister() {
    const ref = this.dialog.open(DinamycFormComponent, {
      data: { formFields: this.formFields },
      minWidth: 500,
    });

    ref.afterClosed().subscribe((data) => {
      if (data) {
        this.create(data);
      }
    });
  }

  public update(data: any) {
    const origin = this.originForm || this.origin;
    this.service.update(origin, data).subscribe(
      (res) => {
        this.getDataSource();
        this.onSuccess(false);
      },
      (err) => {
        this.showMsg(err.name || err.message);
      }
    );
  }

  private create(data: any) {
    const origin = this.originForm || this.origin;
    this.service.create(origin, data).subscribe(
      (res) => {
        this.getDataSource();
        this.onSuccess();
      },
      (err) => {
        this.showMsg(err.name || err.message);
      }
    );
  }

  private delete(id: number) {
    const _origin = `${this.origin}/${id}`;
    this.service.delete(_origin).subscribe(
      (res) => {
        this.getDataSource();
        this.onSuccess(false);
      },
      (err) => {
        this.showMsg(err.name || err.message);
      }
    );
  }

  onSuccess(is_create = true) {
    const message = `Registro ${
      is_create ? 'creado' : 'actualizado'
    } exitosamente!`;
    this.showMsg(message);
  }

  showMsg(message: string) {
    this._snackBar.open(message, 'Aceptar', {
      duration: 7000,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
