// bootstrapApplication arranca la app Angular sin necesidad de AppModule.
import { bootstrapApplication } from "@angular/platform-browser";
// provideHttpClient habilita HttpClient para poder hacer peticiones HTTP.
import { provideHttpClient } from "@angular/common/http";
// Importamos el componente principal de la app.
import { AppComponent } from "./app/app.component";

// Iniciamos la aplicacion e inyectamos el cliente HTTP globalmente.
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
}).catch((error) => console.error(error));
