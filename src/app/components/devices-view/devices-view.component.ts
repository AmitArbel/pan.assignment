import { Component, OnInit } from '@angular/core';
import { EventLogsService, IEventLogEntry, EventLogEntrySeverities, EventLogEntryTypes } from 'src/app/services/event-logs.service';
import { DevicesService, GetDevicesResponse } from 'src/app/services/devices.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-devices-view',
  templateUrl: './devices-view.component.html',
  styleUrls: ['./devices-view.component.scss'],
  providers: []
})
export class DevicesViewComponent implements OnInit {

  allDevices: Observable<GetDevicesResponse>;
  allEvents: Observable<IEventLogEntry[]>;

  eventSeverities = EventLogEntrySeverities;
  eventTypes = EventLogEntryTypes;

  constructor(
    private eventsSvc: EventLogsService,
    private devicesSvc: DevicesService
  ) {
    this.allDevices = this.devicesSvc.getDevices();
  }

  ngOnInit() {
  }
}
