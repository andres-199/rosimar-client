import { Injectable } from '@angular/core'
import { MatPaginatorIntl } from '@angular/material/paginator'

@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = 'Elementos por página'
  nextPageLabel = 'Siguiente'
  previousPageLabel = 'Anterior'
  firstPageLabel = 'Primera página'
  lastPageLabel = 'Última página'
  getRangeLabel = (page: number, pageSize: number, length: number) =>
    `${!page ? page + 1 : page * pageSize + 1}-${
      !page
        ? pageSize
        : (page + 1) * pageSize > length
        ? length
        : (page + 1) * pageSize
    } de ${length}`
}
