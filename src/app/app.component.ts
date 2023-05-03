import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public nombre: string = '';
  public datos: string = '';
  public arrayDatos: Array<number> = [];
  public numeroMayor: number = 0;
  public numeroMenor: number = 0;

  ngOnInit() {

    this.nombre = localStorage.getItem("nombre") || "";
    this.numeroMayor = Number(localStorage.getItem("mayor")) || 0;
    this.numeroMenor = Number(localStorage.getItem("menor")) || 0;

    const datosStorage = localStorage.getItem("datos") || "";

    if (datosStorage !== "") {
      datosStorage.split(",").map(val => {
        this.arrayDatos.push(Number(val));
      })
    }

  }


  guardarData() {

    const datosLimpios = this.datos.replace(/[^0-9]+/g, ",");
    const arrayDatosLimpio = [...datosLimpios.split(",").filter(val => val !== "")];

    arrayDatosLimpio.map(val => {
      this.arrayDatos.push(Number(val));
    })

    this.arrayDatos.sort(this.ordenarMayorMenor);

    this.numeroMayor = this.arrayDatos[0];
    this.numeroMenor = this.arrayDatos[this.arrayDatos.length - 1];

    this.datos = "";

    localStorage.setItem("nombre", this.nombre);
    localStorage.setItem("datos", this.arrayDatos.toString());
    localStorage.setItem("mayor", this.numeroMayor.toString());
    localStorage.setItem("menor", this.numeroMenor.toString());

  }

  ordenarNumeros(opcion: string) {

    if (opcion === 'mayor') {
      this.arrayDatos.sort(this.ordenarMayorMenor);
    }

    if (opcion === 'menor') {
      this.arrayDatos.sort(this.ordenarMenorMayor);
    }

  }

  ordenarMayorMenor(a: number, b: number) {
    return b - a;
  }

  ordenarMenorMayor(a: number, b: number) {
    return a - b;
  }

  borrarDatos() {

    this.arrayDatos = [];
    this.datos = "";
    this.nombre = "";
    this.numeroMayor = 0;
    this.numeroMenor = 0;

    localStorage.clear();

  }

}
