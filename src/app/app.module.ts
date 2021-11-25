import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventLoopComponent } from './components/1.event-loop/event-loop.component';
import { SchedulersComponent } from './components/2.schedulers/schedulers.component';
import { MarblesComponent } from './components/3.marbles/marbles.component';
import { AngularTestUtilsComponent } from './components/4.angular-test-utils/angular-test-utils.component';
import { MockingStrategyComponent } from './components/5.mocking-strategy/mocking-strategy.component';

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
