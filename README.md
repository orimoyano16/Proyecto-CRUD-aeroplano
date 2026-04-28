# Proyecto-CRUD-aeroplano

### Proyecto de POO y Docker

1. Desarrollar una app Front y Back dockerizada implementando en el backend el aeroplano.
2. Crear un repo de Github
3. Implementar un CRUD del Aeroplano
4. 2 clases deben ser Composición y el resto Agregación.

Primero, entendamos la diferencia teórica para aplicarla al código:

Agregación (Relación "Tiene un"): Las piezas pueden existir independientemente del Aeroplano. Si el aeroplano se destruye, puedes rescatar las hélices o el tren de aterrizaje y usarlos en otro. En código: Se instancian afuera y se pasan por parámetro al constructor.

Composición (Relación "Es parte de"): Las piezas nacen y mueren con el Aeroplano. No tiene sentido que existan por sí solas. En código: Se instancian DENTRO del constructor del Aeroplano.

Para cumplir con la regla, vamos a hacer que Alas y Cubierta sean Composición, y Turbina, Helice y TrendeAterrizaje sean Agregación. Además, implementaremos el CRUD completo (Crear, Leer, Actualizar, Borrar) en la API.


<img width="906" height="545" alt="image" src="https://github.com/user-attachments/assets/31bdfad8-e873-4000-b99f-64f74a998c2c" />


Estructura del proyecto 
<img width="287" height="399" alt="image" src="https://github.com/user-attachments/assets/30c19cf7-77d4-4405-8c8b-2f80d5872e4c" />
