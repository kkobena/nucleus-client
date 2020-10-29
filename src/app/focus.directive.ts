import { Attribute, Directive, ElementRef, Input, SimpleChange } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective {
  @Input("appFocus")
  bgClass: string;
  constructor(private element: ElementRef) {


  }
  ngOnInit() {
    this.element.nativeElement.classList.add(this.bgClass || "bg-success",
      "text-white");
  }
  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    let change = changes["bgClass"];
    let classList = this.element.nativeElement.classList;
    if (!change.isFirstChange() && classList.contains(change.previousValue)) {
      classList.remove(change.previousValue);
    }
    if (!classList.contains(change.currentValue)) {
      classList.add(change.currentValue);
    }
  }
  /*
  constructor(element: ElementRef, @Attribute("appFocus") bgClass: string) {
    element.nativeElement.classList.add(bgClass || "bg-foccus");

  }*/
  /*
  <table class="table table-sm table-bordered table-striped">
  <tr><th></th><th>Name</th><th>Category</th><th>Price</th></tr>
  <tr *ngFor="let item of getProducts(); let i = index"
  [pa-attr]="getProducts().length < 6 ? 'bg-success' : 'bg-warning'">
  <td>{{i + 1}}</td>
  <td>{{item.name}}</td>
  <td [pa-attr]="item.category == 'Soccer' ? 'bg-info' : null">
  {{item.category}}
  </td>
  <td [pa-attr]="'bg-info'">{{item.price}}</td>
  </tr>
  </table>
  */
}
