import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';


@Injectable()
export class CsvUtilsService {

  csvData: string[][] = new Array<Array<string>>();
  csvFileLocation: string = './assets/seeker-data.csv';

  constructor(private http: HttpClient) {
    this.getCsvFile().subscribe(csvRawData => {
      this.extractCsvData(csvRawData);
      // console.log('completed csv fetch, got ' + this.csvData.length + ' rows...');
    });
  }

  getCsvFile(): Observable<any> {
    return this.http.get(this.csvFileLocation, {responseType: 'text'})
  }

  extractCsvData(rawCsvData: string) {
    let allLines: string[] = rawCsvData.split(/\r\n|\n/);
    let headers: string[] = allLines[0].split(',');
    let lines: string[][] = new Array<Array<string>>();

    _.forEach(allLines, (line: string) => {
      let data = line.split(',');
      if (data.length === headers.length) {
        let colValues: string[] = [];
        for (let j = 0; j < headers.length; j++) {
          colValues.push(data[j]);
        }
        lines.push(colValues);
      }
    });
    this.csvData = lines;
  }

}
