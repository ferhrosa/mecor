import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { OrganizerModule } from './organizer/organizer.module';

import { AppComponent } from './app.component';
import { ConfigureComponent } from './configure/configure.component';


@NgModule({
  declarations: [
    AppComponent,
    ConfigureComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    OrganizerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
