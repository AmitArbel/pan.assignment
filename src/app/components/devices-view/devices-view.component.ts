import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/app/services/devices.service';
import { Observable } from 'rxjs';
import {GetDevicesResponse} from '../../common/interfaces';
import {EventLogEntrySeverities, EventLogEntryTypes} from '../../common/consts';

@Component({
  selector: 'app-devices-view',
  templateUrl: './devices-view.component.html',
  styleUrls: ['./devices-view.component.scss'],
  providers: []
})
export class DevicesViewComponent implements OnInit {

  allDevices: Observable<GetDevicesResponse>;

  eventSeverities = EventLogEntrySeverities;
  eventTypes = EventLogEntryTypes;

  constructor(private devicesSvc: DevicesService) {
    this.allDevices = this.devicesSvc.getDevices();
  }

  ngOnInit() {
  }
}
