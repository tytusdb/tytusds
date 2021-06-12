import { Component, OnInit } from '@angular/core';
import { EstructurasService } from '../../services/estructuras.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public estructurasService: EstructurasService) { }

  ngOnInit(): void {
  }

}
