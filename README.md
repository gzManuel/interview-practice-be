# Ejercicio Fullstack,

## Backend

Queremos desde el backend hacer un request a https://swapi.dev/ usando el endpoint de people, https://swapi.dev/api/people/1/
El endpoint debe ser GET localhost:3001/api/character/:number y debe devolver

```JAVASCRIPT
{
  name: "",
  birth_year: "",
  homeworld: ""
}
```

homeworld es un endpoint que tiene el payload de people al que hay que hacer fetch para recuperar el name de planets

## Frontend:

Habilitamos 10 botones, del 1 al 10 para consumir el endpoint de character y poder mostrar name, birth_year y homeworld
