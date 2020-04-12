import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.page.html',
  styleUrls: ['./data-table.page.scss'],
})
export class DataTablePage {
  page = 0;
  resultsCount = 10;
  totalPages = 10;

  data=[];
  bulkEdit = false;
  sortDirection = 0;
  constructor(private http: HttpClient) {
    this.loadData(); 
   }

  loadData(){
    this.http.get(`https://randomuser.me/api/?page=${this.page}&result=${this.resultsCount}`).subscribe(res => {
      console.log('res_ ', res);
      this.data = res['results'];
    });
  }

  sortBy(key){

  }
  toggleBulkEdit(){

  }
  bulkDelete(){
    
  }
}
