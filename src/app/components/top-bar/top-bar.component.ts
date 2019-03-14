import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/app/services/devices.service';
import { DeviceViewComponent } from '../device-view/device-view.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    /*
    debugger;

    const modalRef = this.modalService.open(DeviceViewComponent);
    modalRef.componentInstance.name = 'World';

    */

    this.devicesSvc.addDevice();

  }
}
