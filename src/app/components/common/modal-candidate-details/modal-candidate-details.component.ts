import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-candidate-details',
  templateUrl: './modal-candidate-details.component.html',
  styleUrls: ['./modal-candidate-details.component.scss']
})
export class ModalCandidateDetailsComponent implements OnInit {

  @Input() aplicante: any;

  constructor() { }

  ngOnInit() {
    console.log(this.aplicante);
  }

}
