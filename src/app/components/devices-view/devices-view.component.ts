import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/app/services/devices.service';
import { Observable } from 'rxjs';
import {GetDevicesResponse} from '../../common/interfaces';
import {EventLogEntrySeverities, EventLogEntryTypes} from '../../common/consts';
import {ToastrHelper} from "../../common/helpers/toastr-helper";

@Component({
  selector: 'app-devices-view',
  templateUrl: './devices-view.component.html',
  styleUrls: ['./devices-view.component.scss'],
  providers: []
})
export class DevicesViewComponent implements OnInit {

  allDevices: GetDevicesResponse;

  eventSeverities = EventLogEntrySeverities;
  eventTypes = EventLogEntryTypes;

  constructor(private devicesSvc: DevicesService) {
    let newDeviceObservableSubscription;
    const getDevicesObserver =  {
      next: (result) => {
        this.allDevices = result;
        if (newDeviceObservableSubscription) {
          newDeviceObservableSubscription.unsubscribe();
        }
      },
      error: () => {
        ToastrHelper.error(`Failed to get devices from server`);
      }
    };
    newDeviceObservableSubscription = this.devicesSvc.getDevices().subscribe(getDevicesObserver);
  }

  ngOnInit() {
  }
}
