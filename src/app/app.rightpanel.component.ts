import {Component} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-rightpanel',
    templateUrl: './app.rightpanel.component.html'
})
export class AppRightPanelComponent {

    constructor(public app: AppComponent) {}
}
