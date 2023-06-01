import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, HostBinding, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IList } from './list.interface';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit, AfterViewInit {
  listColumns: string[] = ['priority', 'description', 'dueDate'];
  dataSource: MatTableDataSource<IList>;

  public pageTitle = 'To Do Management Table'

  serverUrl = 'http://localhost:5000/toDoList/';

  constructor(
    private http: HttpClient
  ) { }

  @HostBinding('class') class = 'list';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<IList>();
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http.get<IList[]>(this.serverUrl).subscribe((data: IList[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  sortData(): void {
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId) => {
      switch (sortHeaderId) {
        case 'priority':
          return data.priority;
        case 'description':
          return data.description;
        case 'dueDate':
          return data.dueDate;
        default:
          return '';
      }
    };

    this.dataSource.sort = this.sort;
  }
}