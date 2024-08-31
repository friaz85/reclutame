import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tan-simple-como',
  templateUrl: './tan-simple-como.component.html',
  styleUrls: ['./tan-simple-como.component.scss']
})
export class TanSimpleComoComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

}
