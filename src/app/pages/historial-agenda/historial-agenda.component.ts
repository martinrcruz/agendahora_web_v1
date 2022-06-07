import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HistorialAgendaService } from '../../services/historial-agenda.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-historial-agenda',
  templateUrl: './historial-agenda.component.html',
  styleUrls: ['./historial-agenda.component.scss']
})
export class HistorialAgendaComponent implements OnInit {


  constructor(private historialAgendaService: HistorialAgendaService, public dialog: MatDialog) { }
  



  ngOnInit(): void {
  }

agregarElemento(){

}



}
