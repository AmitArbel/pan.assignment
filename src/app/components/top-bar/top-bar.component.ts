import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/app/services/devices.service';
import { DeviceViewComponent } from '../device-view/device-view.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DeviceInputComponent} from "../device-input/device-input.component";

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
    this.modalService.open(DeviceInputComponent).result.then((result) => {
      console.log(result);
      this.devicesSvc.addDevice();
//      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
//      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
