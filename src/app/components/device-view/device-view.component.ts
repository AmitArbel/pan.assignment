import {Component, Input, OnInit} from '@angular/core';
import {IDevice} from '../../services/devices.service';

@Component({
  selector: 'app-device-view',
  templateUrl: './device-view.component.html',
  styleUrls: ['./device-view.component.scss']
})
export class DeviceViewComponent implements OnInit {

  @Input() device: IDevice;

  constructor() { }

  ngOnInit() {
  }

}
