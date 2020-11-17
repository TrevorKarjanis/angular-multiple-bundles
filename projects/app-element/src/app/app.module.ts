import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    if (!customElements.get('app-element')) {
      const el = createCustomElement(AppComponent, { injector: this.injector });
      customElements.define('app-element', el);
    }
  }

  ngDoBootstrap() { /* Eliminate the requirement that the application exist on startup. */ }
}
