import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-job-detail',
  templateUrl: './modal-job-detail.component.html',
  styleUrls: ['./modal-job-detail.component.scss']
})
export class ModalJobDetailComponent implements OnInit {

  @Input() job: any;
  @Input() company: any;


  constructor() { }

  ngOnInit() {
    console.log(this.job);
    console.log(this.company);
  }

}
