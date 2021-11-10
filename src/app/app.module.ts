import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventLoopComponent } from './components/event-loop/event-loop.component';
import { SchedulersComponent } from './components/schedulers/schedulers.component';
import { MarblesComponent } from './components/marbles/marbles.component';
import { AngularTestUtilsComponent } from './components/angular-test-utils/angular-test-utils.component';
import { MockingStrategyComponent } from './components/mocking-strategy/mocking-strategy.component';

@NgModule({
  declarations: [
    AppComponent,
    EventLoopComponent,
    SchedulersComponent,
    MarblesComponent,
    AngularTestUtilsComponent,
    MockingStrategyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
