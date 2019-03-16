import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {PanValidators} from "../../common/helpers/validators";
import {INewDeviceParams} from "../../common/interfaces";

@Component({
  selector: 'app-device-input',
  templateUrl: './device-input.component.html',
  styleUrls: ['./device-input.component.scss']
})
export class DeviceInputComponent implements OnInit {

  private deviceName: FormControl;
  private deviceIp: FormControl;
  private regForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.deviceName = new FormControl('', Validators.required);
    this.deviceIp = new FormControl('', [Validators.required, PanValidators.ipValidator()]);
    this.regForm = this.formBuilder.group({
      deviceName: this.deviceName,
      deviceIp: this.deviceIp,
    });
  }

  ngOnInit() {
  }

  registerDevice() {
    if (this.regForm.invalid) {
      return;
    }

    const returnValue: INewDeviceParams = {
      name: this.regForm.value.deviceName,
      ipAddress: this.regForm.value.deviceIp,
    };
    this.activeModal.close(returnValue);

  }
}
