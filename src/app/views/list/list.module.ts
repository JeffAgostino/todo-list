import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    // HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
