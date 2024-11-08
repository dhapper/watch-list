import { Component } from '@angular/core';
import { TestComponent } from './components/test-component/test-component.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [TestComponent, SearchPageComponent],  // Import your standalone components
})
export class AppComponent {}
