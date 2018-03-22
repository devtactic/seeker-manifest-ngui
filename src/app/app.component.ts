import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  csvData: string[][] = new Array<Array<string>>();

  extractCsvData(rawCsvData: string) {
    let allTextLines: string[] = rawCsvData.split(/\r\n|\n/);
    let headers: string[] = allTextLines[0].split(',');
    let lines: string[][] = new Array<Array<string>>();

    for ( let i = 0; i < allTextLines.length; i++) {
      // split content based on comma
      let data = allTextLines[i].split(',');
      if (data.length == headers.length) {
        let colValues: string[] = [];
        for ( let j = 0; j < headers.length; j++) {
          colValues.push(data[j]);
        }
        lines.push(colValues);
      }
    }
    this.csvData = lines;
  }

}
