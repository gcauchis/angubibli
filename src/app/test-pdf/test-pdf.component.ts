import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { MessagesService } from '../messages.service';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-test-pdf',
  templateUrl: './test-pdf.component.html',
  styleUrls: ['./test-pdf.component.css']
})
export class TestPDFComponent implements OnInit {

  @ViewChild('pdfContent') pdfContent:ElementRef;

  constructor(
    private messagesService: MessagesService) { }

  ngOnInit() {
  }
  
  public openPDF():void {
    this.log('openPDF')
    let DATA = this.pdfContent.nativeElement;
    let doc = new jsPDF();
    
    this.log(DATA)
    this.log(DATA.innerHTML)
  
    doc.html(DATA.innerHTML, {
      callback: function (doc) {
        doc.save();
      }
    });
    doc.output('dataurlnewwindow');
  }

  public downloadPDF():void {
    let DATA = this.pdfContent.nativeElement;
    let doc = new jsPDF();

    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.html(DATA.innerHTML,{
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('angular-demo.pdf');
  }

  public captureScreen()  
  {  
    var data = document.getElementById('pdfContent');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  
  
  private log(message: string) {
    this.messagesService.add(`TestPDFComponent: ${message}`);
  }
}