import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Titulo principal de ejemplo -->
    <h1>Frontend Angular + Backend Express</h1>

    <!-- Boton que dispara la peticion HTTP -->
    <button (click)="pedirSaludo()">Pedir mensaje al backend</button>

    <!-- Mostramos el resultado cuando llega la respuesta -->
    <p *ngIf="mensaje">{{ mensaje }}</p>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: Arial, sans-serif;
        padding: 2rem;
      }

      button {
        padding: 0.7rem 1rem;
        cursor: pointer;
      }

      p {
        margin-top: 1rem;
        background: #e9ffe9;
        border: 1px solid #79c979;
        padding: 0.8rem;
        border-radius: 8px;
      }
    `
  ]
})
export class AppComponent {
  // Guardamos aqui el texto que responde el backend.
  mensaje = "";

  // Inyectamos HttpClient para poder hacer la llamada GET.
  constructor(private readonly http: HttpClient) {}

  pedirSaludo(): void {
    // Hacemos GET al endpoint del backend.
    this.http
      .get<{ mensaje: string }>("http://localhost:3000/api/saludo")
      .subscribe({
        // Si sale bien, guardamos el mensaje para mostrarlo en pantalla.
        next: (respuesta) => {
          this.mensaje = respuesta.mensaje;
          // Tambien mostramos un cartel emergente como pediste.
          alert(this.mensaje);
        },
        // Si falla, mostramos un mensaje amigable.
        error: () => {
          this.mensaje = "No se pudo conectar con el backend.";
          alert(this.mensaje);
        }
      });
  }
}
