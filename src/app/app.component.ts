import { Component } from '@angular/core';
import { TestComponent } from './components/test-component/test-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<app-test-component></app-test-component>`, // Adjust to match your component's selector
  imports: [TestComponent] // Import your TestComponent here
})
export class AppComponent {}
