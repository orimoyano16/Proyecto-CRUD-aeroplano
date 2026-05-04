import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AeroplanoData } from './aeroplano';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="app-container">
      <header class="header text-center">
        <h1 class="title">Gestor de Aeroplanos</h1>
        <p class="subtitle">Administra tu flota con la mejor tecnología</p>
      </header>

      <main class="main-content grid-layout">
        <!-- Formulario (Create / Update) -->
        <section class="glass-panel form-section">
          <h2>{{ isEditing ? 'Editar Aeroplano' : 'Nuevo Aeroplano' }}</h2>
          <form (ngSubmit)="saveAeroplano()" #aeroplanoForm="ngForm">
            
            <!-- Datos Generales -->
            <div class="form-section-title">Datos Generales</div>
            <div class="grid-2">
              <div class="form-group">
                <label>Marca</label>
                <input type="text" class="form-control" name="marca" [(ngModel)]="currentAeroplano.marca" required>
              </div>
              <div class="form-group">
                <label>Modelo</label>
                <input type="text" class="form-control" name="modelo" [(ngModel)]="currentAeroplano.modelo" required>
              </div>
              <div class="form-group">
                <label>Año</label>
                <input type="number" class="form-control" name="anio" [(ngModel)]="currentAeroplano.anio" required>
              </div>
            </div>

            <!-- Hélices y Turbinas -->
            <div class="form-section-title">Propulsión</div>
            <div class="grid-2">
              <div class="form-group">
                <label>Número de Hélices</label>
                <input type="number" class="form-control" name="numHelices" [(ngModel)]="currentAeroplano.helice.numHelices" required>
              </div>
              <div class="form-group">
                <label>Número de Turbinas</label>
                <input type="number" class="form-control" name="numTurbinas" [(ngModel)]="currentAeroplano.turbina.numTurbinas" required>
              </div>
            </div>

            <!-- Tren de Aterrizaje -->
            <div class="form-section-title">Tren de Aterrizaje</div>
            <div class="grid-2">
              <div class="form-group">
                <label>Neumáticos</label>
                <input type="number" class="form-control" name="numNeumaticos" [(ngModel)]="currentAeroplano.trenAterrizaje.numNeumaticos" required>
              </div>
              <div class="form-group">
                <label>Amortiguadores</label>
                <input type="number" class="form-control" name="numAmortiguadores" [(ngModel)]="currentAeroplano.trenAterrizaje.numAmortiguadores" required>
              </div>
              <div class="checkbox-group" style="grid-column: span 2;">
                <input type="checkbox" name="fijoRetractil" [(ngModel)]="currentAeroplano.trenAterrizaje.fijoRetractil" id="retractil">
                <label for="retractil" style="margin:0;">¿Es Retráctil?</label>
              </div>
            </div>

            <!-- Alas -->
            <div class="form-section-title">Alas</div>
            <div class="grid-2">
              <div class="form-group">
                <label>Alas Frontales</label>
                <input type="number" class="form-control" name="numAlasFrente" [(ngModel)]="currentAeroplano.alas.numAlasFrente" required>
              </div>
              <div class="form-group">
                <label>Alas de Cola</label>
                <input type="number" class="form-control" name="numAlasCola" [(ngModel)]="currentAeroplano.alas.numAlasCola" required>
              </div>
            </div>

            <!-- Cubierta -->
            <div class="form-section-title">Cubierta y Equipamiento</div>
            <div class="grid-2">
              <div class="form-group">
                <label>Tanques de Combustible</label>
                <input type="number" class="form-control" name="numTanquesCombustible" [(ngModel)]="currentAeroplano.cubierta.numTanquesCombustible" required>
              </div>
              <div class="form-group">
                <label>Puertas de Salida</label>
                <input type="number" class="form-control" name="numPuertasSalidas" [(ngModel)]="currentAeroplano.cubierta.numPuertasSalidas" required>
              </div>
            </div>
            
            <div class="grid-2" style="margin-bottom: 1.5rem;">
              <div class="checkbox-group">
                <input type="checkbox" name="cabinaTripulacion" [(ngModel)]="currentAeroplano.cubierta.cabinaTripulacion" id="tripulacion">
                <label for="tripulacion" style="margin:0;">Cabina de Tripulación</label>
              </div>
              <div class="checkbox-group">
                <input type="checkbox" name="cabinaVuelo" [(ngModel)]="currentAeroplano.cubierta.cabinaVuelo" id="vuelo">
                <label for="vuelo" style="margin:0;">Cabina de Vuelo</label>
              </div>
              <div class="checkbox-group">
                <input type="checkbox" name="sistemaEmergencia" [(ngModel)]="currentAeroplano.cubierta.sistemaEmergencia" id="emergencia">
                <label for="emergencia" style="margin:0;">Sistema de Emergencia</label>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" [disabled]="!aeroplanoForm.form.valid">
                {{ isEditing ? 'Actualizar' : 'Guardar' }}
              </button>
              <button type="button" class="btn btn-accent" *ngIf="isEditing" (click)="resetForm()">
                Cancelar
              </button>
            </div>
          </form>
        </section>

        <!-- Lista (Read / Delete) -->
        <section class="glass-panel list-section">
          <h2>Flota Registrada</h2>
          <div *ngIf="aeroplanos.length === 0" class="empty-state">
            No hay aeroplanos registrados.
          </div>
          <div class="cards-container">
            <div class="aeroplano-card glass-panel" *ngFor="let aero of aeroplanos">
              <div class="card-header">
                <h3>{{ aero.marca }} {{ aero.modelo }}</h3>
                <span class="badge">{{ aero.anio }}</span>
              </div>
              <div class="card-body">
                <p><strong>Hélices:</strong> {{ aero.helice?.numHelices || 0 }} | <strong>Turbinas:</strong> {{ aero.turbina?.numTurbinas || 0 }}</p>
                <p><strong>Alas:</strong> {{ aero.alas?.numAlasFrente || 0 }} Frontales, {{ aero.alas?.numAlasCola || 0 }} Cola</p>
                <p><strong>Tren:</strong> {{ aero.trenAterrizaje?.numNeumaticos || 0 }} Neumáticos, {{ aero.trenAterrizaje?.fijoRetractil ? 'Retráctil' : 'Fijo' }}</p>
                <div class="tags">
                  <span class="tag" *ngIf="aero.cubierta?.cabinaTripulacion">Tripulación</span>
                  <span class="tag" *ngIf="aero.cubierta?.cabinaVuelo">Vuelo</span>
                  <span class="tag" *ngIf="aero.cubierta?.sistemaEmergencia">Emergencia</span>
                </div>
              </div>
              <div class="card-footer">
                <button class="btn btn-sm btn-primary" (click)="editAeroplano(aero)">Editar</button>
                <button class="btn btn-sm btn-danger" (click)="deleteAeroplano(aero.id!)">Eliminar</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .app-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .header { margin-bottom: 3rem; }
    .title { font-size: 3rem; font-weight: 800; background: linear-gradient(to right, var(--primary-color), var(--accent-color)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
    .subtitle { color: var(--text-secondary); font-size: 1.2rem; }
    .grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .glass-panel { padding: 2rem; }
    .form-section-title { font-size: 1.1rem; color: var(--primary-hover); margin: 1.5rem 0 1rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem; font-weight: 600; }
    .form-actions { display: flex; gap: 1rem; margin-top: 2rem; }
    .empty-state { color: var(--text-secondary); text-align: center; padding: 3rem; font-style: italic; }
    .cards-container { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1.5rem; }
    .aeroplano-card { padding: 1.5rem; transition: transform 0.3s ease; }
    .aeroplano-card:hover { transform: translateY(-5px); }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem; }
    .card-header h3 { margin: 0; color: var(--text-primary); }
    .badge { background: rgba(59, 130, 246, 0.2); color: var(--primary-hover); padding: 0.25rem 0.75rem; border-radius: 99px; font-size: 0.875rem; font-weight: 600; }
    .card-body p { margin: 0.5rem 0; color: var(--text-secondary); font-size: 0.9rem; }
    .tags { display: flex; gap: 0.5rem; margin-top: 1rem; }
    .tag { background: rgba(236, 72, 153, 0.15); color: var(--accent-color); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; }
    .card-footer { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.5rem; }
    .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.875rem; }
    @media (max-width: 992px) { .grid-layout { grid-template-columns: 1fr; } }
  `]
})
export class AppComponent implements OnInit {
  aeroplanos: AeroplanoData[] = [];
  isEditing = false;
  apiUrl = 'http://localhost:3000/api/aeroplanos';

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.fetchAeroplanos();
  }

  fetchAeroplanos() {
    this.http.get<{aeroplanos: any[]}>(`${this.apiUrl}/obtenerAeroplanos`).subscribe({
      next: (response) => {
        if (response.aeroplanos) {
          this.aeroplanos = response.aeroplanos.map(item => this.mapBackendToFrontend(item));
        }
      },
      error: (err) => console.error("Error fetching aeroplanos", err)
    });
  }

  mapBackendToFrontend(item: any): AeroplanoData {
    const aero = item.aeroplano;
    return {
      id: item.id,
      marca: aero.marca,
      modelo: aero.modelo,
      anio: aero.anio,
      helice: { numHelices: aero.helice?.numHelices || 0 },
      trenAterrizaje: { 
        numNeumaticos: aero.trenAterrizaje?.numNeumaticos || 0, 
        numAmortiguadores: aero.trenAterrizaje?.numAmortiguadores || 0, 
        fijoRetractil: aero.trenAterrizaje?.fijoRetractil || false 
      },
      alas: { 
        numAlasFrente: aero.alas?.numAlasFrente || 0, 
        numAlasCola: aero.alas?.numAlasCola || 0 
      },
      cubierta: { 
        cabinaTripulacion: aero.cubierta?.cabinaTripulacion || false, 
        cabinaVuelo: aero.cubierta?.cabinaVuelo || false, 
        sistemaEmergencia: aero.cubierta?.sistemaEmergencia || false, 
        numTanquesCombustible: aero.cubierta?.numTanquesCombustible || 0, 
        numPuertasSalidas: aero.cubierta?.numPuertasSalidas || 0 
      },
      turbina: { numTurbinas: aero.turbina?.numTurbinas || 0 }
    };
  }

  getPayload(data: AeroplanoData) {
    return {
      marca: data.marca,
      modelo: data.modelo,
      anio: data.anio,
      cantAlasFrente: data.alas.numAlasFrente,
      cantAlasCola: data.alas.numAlasCola,
      numNeumaticos: data.trenAterrizaje.numNeumaticos,
      numAmortiguadores: data.trenAterrizaje.numAmortiguadores,
      fijoRetractil: data.trenAterrizaje.fijoRetractil,
      cabinaTripulacion: data.cubierta.cabinaTripulacion,
      cabinaVuelo: data.cubierta.cabinaVuelo,
      sistemaEmergencia: data.cubierta.sistemaEmergencia,
      numTanquesCombustible: data.cubierta.numTanquesCombustible,
      numPuertasSalidas: data.cubierta.numPuertasSalidas,
      numHelices: data.helice.numHelices,
      numTurbinas: data.turbina.numTurbinas
    };
  }

  defaultAeroplano(): AeroplanoData {
    return {
      marca: '', modelo: '', anio: new Date().getFullYear(),
      helice: { numHelices: 0 },
      trenAterrizaje: { numNeumaticos: 0, numAmortiguadores: 0, fijoRetractil: false },
      alas: { numAlasFrente: 0, numAlasCola: 0 },
      cubierta: { cabinaTripulacion: false, cabinaVuelo: false, sistemaEmergencia: false, numTanquesCombustible: 0, numPuertasSalidas: 0 },
      turbina: { numTurbinas: 0 }
    };
  }

  currentAeroplano: AeroplanoData = this.defaultAeroplano();

  saveAeroplano() {
    const payload = this.getPayload(this.currentAeroplano);

    if (this.isEditing) {
      this.http.put(`${this.apiUrl}/actualizarAeroplano/${this.currentAeroplano.id}`, payload).subscribe({
        next: () => {
          this.fetchAeroplanos();
          this.resetForm();
        },
        error: (err) => alert("Error al actualizar aeroplano")
      });
    } else {
      this.http.post(`${this.apiUrl}/crearAeroplano`, payload).subscribe({
        next: () => {
          this.fetchAeroplanos();
          this.resetForm();
        },
        error: (err) => alert("Error al crear aeroplano")
      });
    }
  }

  editAeroplano(aero: AeroplanoData) {
    this.currentAeroplano = JSON.parse(JSON.stringify(aero));
    this.isEditing = true;
  }

  deleteAeroplano(id: number) {
    if(confirm("¿Estás seguro de que deseas eliminar este aeroplano?")) {
      this.http.delete(`${this.apiUrl}/eliminarAeroplano/${id}`).subscribe({
        next: () => {
          this.fetchAeroplanos();
          if (this.isEditing && this.currentAeroplano.id === id) {
            this.resetForm();
          }
        },
        error: (err) => alert("Error al eliminar aeroplano")
      });
    }
  }

  resetForm() {
    this.currentAeroplano = this.defaultAeroplano();
    this.isEditing = false;
  }
}
