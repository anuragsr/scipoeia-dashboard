import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpiderComponent } from './components/spider/spider.component';
import { ConfSeekerComponent } from './components/conf-seeker/conf-seeker.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { CompareComponent } from './components/compare/compare.component';
import { SuggesterComponent } from './components/suggester/suggester.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'spider', component: SpiderComponent },
	{ path: 'conf-seeker', component: ConfSeekerComponent },
	{ path: 'explorer', component: ExplorerComponent },
	{ path: 'compare', component: CompareComponent },
	{ path: 'suggester', component: SuggesterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
