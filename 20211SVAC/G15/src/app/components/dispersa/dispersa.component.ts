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
    this.dispersa.add("A",0,3)
    this.dispersa.add("A",3,2)
    this.dispersa.add("A",1,5)
    this.dispersa.add("B",1,6)
    this.dispersa.add("B",3,"nepe")
  }

}
