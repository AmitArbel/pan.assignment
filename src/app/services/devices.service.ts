import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {
  AddDeviceResponse, GetDevicesResponse, IBaseDevice, IDevice, INewDeviceParams,
  ITempDevice
} from '../common/interfaces';
import {DevicesRestService} from './rest/devices-rest.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  private devices: Observable<GetDevicesResponse>;
  private loadedDevices: IBaseDevice[] = [];
  private newDeviceId = 0;

  constructor(private devicesRestService: DevicesRestService) { }

  /**** SIMPLE IMPLEMENTATION ******
    This implementation doesn't support 'new device stubbing'.
    Using this implementation will make the new device being shown only after response is retrieved from server.

   getDevices(): Observable<GetDevicesResponse> {
    if (!this.devices) {
      this.devices = this.devicesRestService.getDevices();
    }
    return this.devices;
  }

   addDevice(params: INewDeviceParams): Observable<AddDeviceResponse> {
    return this.devicesRestService.addDevice(params);
  }
   */
  getDevices(): Observable<GetDevicesResponse> {
    const devicesObservable = new Observable<GetDevicesResponse>(observer => {
      if (!this.devices) {
        // this.devices = this.devicesRestService.getDevices();
        this.devicesRestService.getDevices().subscribe(response => {
          this.loadedDevices.splice(0, this.loadedDevices.length);
          this.loadedDevices.push(...response);
        },
        observer.error,
        observer.complete);
      }
      observer.next(this.loadedDevices);
    });

    return devicesObservable;
  }

  addDevice(params: INewDeviceParams): Observable<AddDeviceResponse> {
    const devicesObservable = new Observable<AddDeviceResponse>(observer => {
      const newDeviceId = this.pushTempDeviceStub(params);

      this.devicesRestService.addDevice(params).subscribe(response => {
          this.replaceTempStub(newDeviceId, response);

          observer.next(response);
        },
        observer.error,
        observer.complete);
    });

    return devicesObservable;
  }

  private replaceTempStub(newDeviceId: number, response) {
    const stubDeviceIndex = this.loadedDevices.findIndex(device => (device as ITempDevice).tempId === newDeviceId);
    this.loadedDevices.splice(stubDeviceIndex, 1, response);
  }

  private pushTempDeviceStub(params: INewDeviceParams) {
    if (this.newDeviceId === Number.MAX_SAFE_INTEGER) {
      this.newDeviceId = 0;
    }
    const newDeviceId = this.newDeviceId++;
    const newTempDevice: ITempDevice = {
      name: params.name,
      isTemp: true,
      tempId: newDeviceId,
    };

    this.loadedDevices.unshift(newTempDevice);
    return newDeviceId;
  }
}
