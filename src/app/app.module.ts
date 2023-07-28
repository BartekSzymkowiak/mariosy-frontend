import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { MariosCardComponent } from './components/marios-card/marios-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MariosDialogComponent } from './components/marios-dialog/marios-dialog.component';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ReceivedMariosComponent } from './components/received-marios/received-marios.component';
import { SentMariosComponent } from './components/sent-marios/sent-marios.component';
import { CreateMariosComponent } from './components/create-marios/create-marios.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    InfoCardComponent,
    MariosCardComponent,
    MariosDialogComponent,
    ReceivedMariosComponent,
    SentMariosComponent,
    CreateMariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
