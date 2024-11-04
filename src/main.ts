import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import necessary HttpClient functions

// Update the bootstrapApplication call to include the HttpClient providers
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(withFetch()), // Provide HttpClient with fetch support
    // Add any other providers you need here
  ]
})
.catch((err) => console.error(err));
