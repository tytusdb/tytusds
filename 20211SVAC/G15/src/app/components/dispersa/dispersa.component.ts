import { Component, OnInit } from '@angular/core';
import { Dispersa, Tipo } from 'src/app/helpers/Dispersa/Dispersa';

@Component({
  selector: 'app-dispersa',
  templateUrl: './dispersa.component.html',
  styleUrls: ['./dispersa.component.css']
})
export class DispersaComponent implements OnInit {
  dispersa:Dispersa
  constructor() { }

  ngOnInit(): void {
    this.dispersa = new Dispersa(Tipo.DOBLE)
    this.dispersa.add(6,1,3)
    this.dispersa.add(2,1,2)
    this.dispersa.add(7,1,3)

  }

}
