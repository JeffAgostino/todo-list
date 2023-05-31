import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IList } from './list.interface';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit, AfterViewInit {
  listColumns: string[] = ['priority', 'description', 'dueDate'];
  dataSource: IList[];
  displayedDataSource: IList[];
  serverUrl = 'http://localhost:5000/toDoList/';

  constructor(
    private http: HttpClient,
    private _paginator: MatPaginatorIntl
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this._paginator.itemsPerPageLabel = 'Itens por página';
    this._paginator.nextPageLabel = 'Próxima página';
    this._paginator.previousPageLabel = 'Página anterior';
    this._paginator.firstPageLabel = 'Primeira página';
    this._paginator.lastPageLabel = 'Última página';
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http.get<IList[]>(this.serverUrl).subscribe((data: IList[]) => {
      this.dataSource = data;
      this.sortData();
      this.paginateData();
    });
  }

  sortData(): void {
    if (this.sort.active && this.sort.direction) {
      this.dataSource.sort((a, b) => {
        const isAsc = this.sort.direction === 'asc';
        switch (this.sort.active) {
          case 'priority':
            return this.compare(a.priority, b.priority, isAsc);
          case 'description':
            return this.compare(a.description, b.description, isAsc);
          case 'dueDate':
            return this.compare(a.dueDate, b.dueDate, isAsc);
          default:
            return 0;
        }
      });
    }
  }

  compare(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  paginateData(): void {
    if (this.paginator) {
      this.paginator.length = this.dataSource.length;
      this.paginator.page.subscribe(() => {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.displayedDataSource = this.dataSource.slice(startIndex, startIndex + this.paginator.pageSize);
      });
    }
  }
}