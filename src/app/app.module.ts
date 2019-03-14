import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { DevicesViewComponent } from './components/devices-view/devices-view.component';
import { DeviceViewComponent } from './components/device-view/device-view.component';
import { EventLogsService } from './services/event-logs.service';
import { DevicesService } from './services/devices.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopBarComponent,
    DevicesViewComponent,
    DeviceViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    EventLogsService,
    DevicesService
  ],
  bootstrap: [AppComponent, DeviceViewComponent]
})
export class AppModule { }
