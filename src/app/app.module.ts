import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpiderComponent } from './components/spider/spider.component';
import { ConfSeekerComponent } from './components/conf-seeker/conf-seeker.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { CompareComponent } from './components/compare/compare.component';
import { SuggesterComponent } from './components/suggester/suggester.component';
import { HomeComponent } from './components/home/home.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    AppComponent,
    SpiderComponent,
    ConfSeekerComponent,
    ExplorerComponent,
    CompareComponent,
    SuggesterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgScrollbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
