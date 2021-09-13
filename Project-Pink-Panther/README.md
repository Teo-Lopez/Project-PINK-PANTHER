# Endpoints

| Id  | Method | Path                     | Description                                                |
| --- | ------ | ------------------------ | ---------------------------------------------------------- |
| 1   | get    | /login-form              | Muestra el formulario de login                             |
| 2   | post   | /login-form              | iniciar sesion un usuario                                  |
| 3   | get    | /auth-form               | Muestra el formulario crear usuario                        |
| 4   | post   | /auth-form               | Guarda un nuevo usuario                                    |
| 5   | get    | /(index)                 | Muestra lista de upload aleatorios max. 10                 |
| 6   | get    | /upload/deatils/:id      | Muestra los detalles del upload que selecciones            |
| 7   | get    | /upload/create           | Muestra el formulario de creacion de upload                |
| 8   | post   | /upload/create           | Guarda la informacion de un nuevo upload                   |
| 9   | get    | /upload/trend            | Muestra grupos de upload en funcion de sus tags            |
| 10  | get    | /upload/list-tag?tag=xxx | Muestra la lista de upload en funcion del tag que le pasas |
| 11  | get    | /api                     | ruta de la api                                             |

//no se si es necesaria obligatoriamente
| 12 | post | /delete/:id | Elimina el archivo subido |
