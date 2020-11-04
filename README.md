# Ecuador

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

class="table table-sm table-bordered m-2"

<form novalidate #form="ngForm" (ngSubmit)="submitForm(form)">
formSubmitted: boolean = false;
submitForm(form: NgForm) {
this.formSubmitted = true;
if (form.valid) {
this.addProduct(this.newProduct);
this.newProduct = new Product();
form.reset();
this.formSubmitted = false;
}
}

getValidationMessages(state: any, thingName?: string) {
let thing: string = state.path || thingName;
let messages: string[] = [];
if (state.errors) {
for (let errorName in state.errors) {
switch (errorName) {
case "required":
messages.push(`You must enter a ${thing}`);
break;
case "minlength":
messages.push(`A ${thing} must be at least
${state.errors['minlength'].requiredLength}
characters`);
break;
case "pattern":
messages.push(`The ${thing} contains
illegal characters`);
break;
}
}
}
return messages;
}
<ul class="text-danger list-unstyled" *ngIf="name.dirty && name.invalid">
<li *ngFor="let error of getValidationMessages(name)">
{{error}}
</li>
</ul>
@Directive({
selector: '[appOnFocusBlur]'
})
export class OnFocusBlurDirective {
constructor() { }
@HostBinding("style.background-color") backgroundColor;
@HostListener('focus') onFocus() {
this.backgroundColor = '#19ffe4';
}
@HostListener('blur') onBlur() {this.backgroundColor = '#ff1934';
}
}