import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventLogsService, IEventLogEntry } from './event-logs.service';

export const DeviceTypes = {
  workstation: "workstation",
  server: "server",
  mobile: "mobile",
};

export const DeviceStatus = {
  active: "active",
  inactive: "inactive",
};

export type DeviceType = "workstation" | "server" | "mobile";
export type DeviceStatus = "active" | "inactive";

export interface IDevice {
  name: string;
  ipAddress: string;
  type: DeviceType;
  status: DeviceStatus;
  events?: IEventLogEntry[];
}
export type GetDevicesResponse = IDevice[];

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  // private devicesMap: Map<string, IDevice>;

  private devices: IDevice[] = this.devicesGenerator();
  /*
   [
    {
      name: "John's device",
      ipAddress: "12.32.12.1",
      type: <DeviceType>DeviceTypes.mobile,
      status: <DeviceStatus>DeviceStatus.active,
    },
    /*
    {
      name: "Jane's device",
      ipAddress: "12.11.21.1",
      type: <DeviceType>DeviceTypes.workstation,
      status: <DeviceStatus>DeviceStatus.inactive,
    },
    {
      name: "server X",
      ipAddress: "14.114.1.8",
      type: <DeviceType>DeviceTypes.server,
      status: <DeviceStatus>DeviceStatus.active,
    },
    {
      name: "old device",
      ipAddress: "3.5.123.1",
      type: <DeviceType>DeviceTypes.mobile,
      status: <DeviceStatus>DeviceStatus.inactive,
    },
  ];
    */

  constructor(private eventsSvc: EventLogsService) { }

  getDevices(): Observable<GetDevicesResponse> {

    /*
    if (!this.devicesMap) {
      this.devicesMap = this.devices.reduce<Map<string, IDevice>>(
        (currentMap, currentDevice) => {
          if (!currentDevice || !currentDevice.name || currentMap.has(currentDevice.name)) {
            return currentMap;
          }
          currentMap.set(currentDevice.name, currentDevice);

          return currentMap;
        },
        new Map<string, IDevice>()
      );
    }
    */

    const devicesObservable = new Observable<GetDevicesResponse>(observer => {
      setTimeout(() => {
        observer.next(this.devices);
      }, 1000);
    });

    return devicesObservable;

    /*
    return Observable.create(observer => {
      const wrappingObserver = Object.assign({}, observer);
      Object.assign(wrappingObserver, {
        next: (eventLogs: IEventLogEntry[]) => {
          eventLogs.forEach((eventLog: IEventLogEntry) => {
            const relatedDevice = this.devicesMap.get(eventLog.relatedDeviceName);
            if (relatedDevice) {
              relatedDevice.events = relatedDevice.events || [];
              relatedDevice.events.push(eventLog);
            }
          });
          observer.next(this.devicesMap.values());
        }
      });

      this.eventsSvc.getEvents().subscribe(wrappingObserver);
    });
    */

  }

  addDevice() {
    const statusKeys = Object.keys(DeviceStatus);
    const status = Math.floor(statusKeys.length * Math.random());

    const typeKeys = Object.keys(DeviceTypes);
    const type = Math.floor(typeKeys.length * Math.random());

    const name = "newly born device";
    const newDevice: IDevice = {
      name: "newly born device",
      ipAddress: "17.122.51.1",
      type: <DeviceType>DeviceTypes[typeKeys[type]],
      status: <DeviceStatus>DeviceStatus[statusKeys[status]],
      events: this.eventsSvc.getEventsForDevice(name),
    };
    this.devices.unshift(newDevice);
    // this.devicesMap.set(newDevice.name, newDevice);
  }

  private devicesGenerator(): IDevice[] {
    const devices = [];

    const names = ["this is importand device", "my device", "don't touch!"];
    const types = [DeviceTypes.mobile, DeviceTypes.server, DeviceTypes.workstation];
    const statuses = [DeviceStatus.active, DeviceStatus.inactive];

    for (let name in names) {
      for (let type in types) {
        for (let status in statuses) {
          const newDevice: IDevice = {
            name: names[name],
            ipAddress: this.generateIP(),
            type: <DeviceType>types[type],
            status: <DeviceStatus>statuses[status],
            events: this.eventsSvc.getEventsForDevice(names[name]),
          };
          devices.push(newDevice);
        }
      }
    }

    return devices;
  }

  private generateIP(): string {
    const ip = [];
    for (let i = 0; i < 4; i++) {
      ip.push(127 * Math.random());
    }
    return ip.join(".");
  }
}
