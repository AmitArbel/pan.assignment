import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { DevicesViewComponent } from './components/devices-view/devices-view.component';
import { DeviceViewComponent } from './components/device-view/device-view.component';
import { DevicesService } from './services/devices.service';
import { DeviceInputComponent } from './components/device-input/device-input.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopBarComponent,
    DevicesViewComponent,
    DeviceViewComponent,
    DeviceInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    FormBuilder,
    DevicesService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeviceInputComponent],
})
export class AppModule { }
