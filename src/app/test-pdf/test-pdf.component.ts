import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";

import { MessagesService } from "../messages.service";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import htmlToPdfmake from "html-to-pdfmake";

@Component({
  selector: "app-test-pdf",
  templateUrl: "./test-pdf.component.html",
  styleUrls: ["./test-pdf.component.css"]
})
export class TestPDFComponent implements OnInit {
  @ViewChild("pdfContent") pdfContent: ElementRef;

  constructor(private messagesService: MessagesService) {}

  ngOnInit() {}

  public openPDF(): void {
    this.log("openPDF");
    let DATA = this.pdfContent.nativeElement;
    let doc = new jsPDF();

    this.log(DATA);
    this.log(DATA.innerHTML);

    doc.setFontSize(12);
    //doc.text("Octonyan loves jsPDF", 35, 25);*/
    doc.text(DATA.innerHTML, 0, 12);

    doc.html(DATA.innerHTML, {
      callback: function(doc) {
        doc.save();
      },
      x: 10,
      y: 10
    });

    /*doc.html(DATA.innerHTML, {
       callback: function (doc) {
        doc.save();
       }
    });*/

    var elementHandler = {
      "#ignorePDF": function(element, renderer) {
        return true;
      }
    };
    /*doc.fromHTML(DATA.innerHTML, 15, 15, {
      width: 180,
      elementHandlers: elementHandler
    });*/

    //doc.fromHTML(DATA.innerHTML, 15, 15);

    doc.output("dataurlnewwindow");
  }

  public downloadPDF(): void {
    let DATA = this.pdfContent.nativeElement;
    let doc = new jsPDF();

    let handleElement = {
      "#editor": function(element, renderer) {
        return true;
      }
    };
    doc.html(DATA.innerHTML, {
      width: 200,
      elementHandlers: handleElement
    });

    doc.save("angular-demo.pdf");
    doc.output("dataurlnewwindow");
  }

  public captureScreen() {
    var data = document.getElementById("pdfContent");
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("MYPdf.pdf"); // Generated PDF
      pdf.output("dataurlnewwindow");
    });
  }

  public pdfMake1() {
    //pdfMake.createPdf(document.getElementById("pdfContent")).open();
    const documentDefinition = {
      content: this.pdfContent.nativeElement.innerHTML
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  public generatePdf(action = "open") {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case "open":
        pdfMake.createPdf(documentDefinition).open();
        break;
      case "print":
        pdfMake.createPdf(documentDefinition).print();
        break;
      case "download":
        pdfMake.createPdf(documentDefinition).download();
        break;
      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  public htmlToPdfmake() {
    this.log(this.pdfContent.nativeElement.innerHTML);
    var html = htmlToPdfmake(this.pdfContent.nativeElement.innerHTML);
    this.log(html);
    pdfMake
      .createPdf({
        content: html
      })
      .open();
  }

  private log(message: string) {
    this.messagesService.add(`TestPDFComponent: ${message}`);
  }
}
