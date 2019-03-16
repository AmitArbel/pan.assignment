import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/app/services/devices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DeviceInputComponent} from '../device-input/device-input.component';
import {INewDeviceParams} from '../../common/interfaces';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private devicesSvc: DevicesService,
  ) { }

  ngOnInit() {
  }

  onAddDeviceClick() {
    this.modalService.open(DeviceInputComponent).result
      .then(this.applyAddingNewDevice.bind(this));
  }

  private applyAddingNewDevice(result: INewDeviceParams) {
    let newDeviceObservableSubscription;
    const newDeviceObserver = {
      complete: () => newDeviceObservableSubscription && newDeviceObservableSubscription.unsubscribe(),
    };
    newDeviceObservableSubscription = this.devicesSvc.addDevice(result).subscribe(newDeviceObserver);
  }
}
