import { Component } from '@angular/core';
import { Tarea, TareaService } from 'src/app/services/tarea.service';
import { WeatherServService } from 'src/app/services/weather-serv.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  paisesArray: string[][] = [ ['../../assets/icons8-circular-alemania-96.png', 'Alemania', 'Germany'],
                              ['../../assets/icons8-circular-argentina-96.png', 'Argentina', 'Buenos Aires'],
                              ['../../assets/icons8-circular-de-francia-96.png', 'Francia', 'Paris'],
                              ['../../assets/icons8-circular-mexico-96.png', 'Mexico', 'Mexico_City']];

  tareasArray: Tarea[] = []
  dataClima: any = null;
  horaActual: string = '';
  private relojInterval: any;

  constructor(private weatherServ: WeatherServService, private tareaServ: TareaService
  ){
    this.consultarClima('Germany');
    this.tareaServ.getAllByUserId(parseInt(localStorage.getItem('token') || '0', 10)).subscribe({
      next: (data) => {
        this.tareasArray = data;
      },
      error: (err) => {
        console.error('Error al traer las tareas', err);
      }
    });;
  }

  consultarClima(nombrePais: string) {
    this.weatherServ.getWeather(nombrePais).subscribe({
      next: (data) => {
        this.dataClima = data;

        const localTimeString = data.location.localtime;
        let localTime = new Date(localTimeString);

        localTime.setSeconds(new Date().getSeconds())

        if (this.relojInterval) clearInterval(this.relojInterval);

        this.updateHoraActual(localTime);
        this.relojInterval = setInterval(() => {
          localTime.setSeconds(localTime.getSeconds() + 1);
          this.updateHoraActual(localTime);
        }, 1000);
      },
      error: (err) => {
        console.error('Error al consultar el clima:', err);
      }
    });
  }

  updateHoraActual(date: Date) {
    const dd = String(date.getDate())
    const mm = String(date.getMonth() + 1)
    const aa = String(date.getFullYear()).slice(-2);

    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');

    this.horaActual = `${dd}/${mm}/${aa} ${h}:${m}:${s}`;
  }

}
