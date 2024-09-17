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
import { CheckedResultsPipe } from './pipes/checked-results.pipe';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [
    AppComponent,
    SpiderComponent,
    ConfSeekerComponent,
    ExplorerComponent,
    CompareComponent,
    SuggesterComponent,
    HomeComponent,
    CheckedResultsPipe,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgScrollbarModule,
    TagInputModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
