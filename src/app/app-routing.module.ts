import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReceivedMariosComponent } from './components/received-marios/received-marios.component';
import { SentMariosComponent } from './components/sent-marios/sent-marios.component';
import { CreateMariosComponent } from './components/create-marios/create-marios.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'received', component: ReceivedMariosComponent },
  { path: 'sent', component: SentMariosComponent },
  { path: 'create', component: CreateMariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
