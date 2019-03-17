import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {
  AddDeviceResponse, GetDevicesResponse, IBaseDevice, ITempDevice
} from '../common/interfaces';
import {DevicesRestService} from './rest/devices-rest.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  private neverFetchedFromServer = true;
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
      if (this.neverFetchedFromServer) {
        // Maintaining the "loaded Devices" in order to enable showing "temp device" while adding new.
        // (see comment above)
        // Therefore, forwarding errors to caller.
        this.devicesRestService.getDevices().subscribe(response => {
          this.loadedDevices.splice(0, this.loadedDevices.length);
          this.loadedDevices.push(...response);
          this.neverFetchedFromServer = false;
        },
        (error) => observer.error(error),
        () => observer.complete());
      }
      observer.next(this.loadedDevices);
    });

    return devicesObservable;
  }

  addDevice(params: IBaseDevice): Observable<AddDeviceResponse> {
    const devicesObservable = new Observable<AddDeviceResponse>(observer => {

      // Here we take advantage of the fact we maintain the devices our-self.

      // Adding a temp stub device for the user to have indication of the process.
      // Plus, in case of failure, it would be shown over this stub as well.
      const newTempDevice = this.pushTempDeviceStub(params);

      this.devicesRestService.addDevice(params).subscribe(response => {
          // Once we have the actual device, re replace the stub with it.
          this.replaceTempStub(newTempDevice.tempId, response);

          observer.next(response);

          // Adding new device process is done.
          observer.complete();
        },
        (error) => {
          // Marking the stub device with error.
          newTempDevice.failedToStore = true;
          observer.error(error);
        },
        () => observer.complete()
      );
    });

    return devicesObservable;
  }

  private replaceTempStub(newDeviceId: number, response) {
    const stubDeviceIndex = this.loadedDevices.findIndex(device => (device as ITempDevice).tempId === newDeviceId);
    this.loadedDevices.splice(stubDeviceIndex, 1, response);
  }

  private pushTempDeviceStub(params: IBaseDevice): ITempDevice {
    // The new temp device will be created with auto-generated ID.
    // It will be used for replacing the it with the actual one once received from server.
    if (this.newDeviceId === Number.MAX_SAFE_INTEGER) {
      this.newDeviceId = 0;
    }
    const newDeviceId = this.newDeviceId++;
    const newTempDevice: ITempDevice = Object.assign({}, params, {
      isTemp: true,
      tempId: newDeviceId,
    });

    // Pushing the new device at the top of the list.
    this.loadedDevices.unshift(newTempDevice);

    return newTempDevice;
  }
}
