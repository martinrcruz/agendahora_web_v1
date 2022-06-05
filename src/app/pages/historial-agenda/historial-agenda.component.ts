import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HistorialAgendaService } from '../../services/historial-agenda.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';


@Component({
  selector: 'app-historial-agenda',
  templateUrl: './historial-agenda.component.html',
  styleUrls: ['./historial-agenda.component.scss']
})
export class HistorialAgendaComponent implements OnInit {


  constructor(private historialAgendaService: HistorialAgendaService, public dialog: MatDialog) { }
  
  
  openModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
      data: 'data'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }


  ngOnInit(): void {
  }

agregarElemento(){

}



}
