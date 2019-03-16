import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddDeviceResponse, GetDevicesResponse, INewDeviceParams } from '../../common/interfaces';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevicesRestService {

  private devices: Observable<GetDevicesResponse>;
  private baseURL: string;

  constructor(private httpClient: HttpClient) {
    const protocol = window.location.protocol;
    const host = window.location.hostname;
    const port = 3000;
    this.baseURL = `${protocol}//${host}:${port}`;
  }

  public getDevices(): Observable<GetDevicesResponse> {
    if (!this.devices) {
      const url = '/devices';
      this.devices = this.httpClient.get<GetDevicesResponse>(this.buildFullURL(url));
    }
    return this.devices;
  }

  public addDevice(params: INewDeviceParams): Observable<AddDeviceResponse> {
    const url = '/devices';
    return this.httpClient.post<AddDeviceResponse>(this.buildFullURL(url), params);
  }

  private buildFullURL(url) {
    return `${this.baseURL}${url}`;
  }
}
