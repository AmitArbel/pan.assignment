import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AddDeviceResponse, GetDevicesResponse, INewDeviceParams} from '../common/interfaces';
import {DevicesRestService} from './rest/devices-rest.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  private devices: Observable<GetDevicesResponse>;

  constructor(private devicesRestService: DevicesRestService) { }

  getDevices(): Observable<GetDevicesResponse> {
    if (!this.devices) {
      this.devices = this.devicesRestService.getDevices();
    }
    return this.devices;
  }

  addDevice(params: INewDeviceParams): Observable<AddDeviceResponse> {
    return this.devicesRestService.addDevice(params);
  }
}
