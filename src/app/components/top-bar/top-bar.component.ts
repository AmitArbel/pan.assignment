import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/app/services/devices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DeviceInputComponent} from '../device-input/device-input.component';
import {INewDeviceParams} from '../../common/interfaces';
import {ToastrHelper} from '../../common/helpers/toastr-helper';

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
    const newDeviceObserver = {
      error: () => {
        ToastrHelper.error(`Failed to add device '${result.name}'`);
      }
    };
    this.devicesSvc.addDevice(result).subscribe(newDeviceObserver);
  }
}
