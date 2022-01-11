import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() totalItems? = 0;
  @Input() itemsPerPage? = 0;
  @Input() actualPage? = 1;
  @Output() onNext = new EventEmitter<number>();
  totalPages = 0;
  items: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.totalPages = Math.ceil(
      (this.totalItems || 0) / (this.itemsPerPage || 0)
    );
    this.items = new Array(this.totalPages);
  }

  onCLickNext() {
    if (this.actualPage) {
      if (this.actualPage < this.totalPages)
        this.actualPage = this.actualPage + 1;
    } else this.actualPage = 1;
    this.onNext.emit(this.actualPage);
  }

  onCLickPage(page: number) {
    this.actualPage = page;
    this.onNext.emit(this.actualPage);
  }
}
