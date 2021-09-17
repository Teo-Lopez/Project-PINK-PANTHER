# Endpoints

| Id  | Metodo | Ruta                     | Descripcion                                                    |
| --- | ------ | ------------------------ | -------------------------------------------------------------- |
| 1   | get    | /inicio-sesion           | Muestra el formulario de login                                 |
| 2   | post   | /inicio-sesion           | Iniciar sesion un usuario                                      |
| 3   | get    | /registro                | Muestra el formulario crear usuario                            |
| 4   | post   | /registro                | Guarda un nuevo usuario                                        |
| 5   | post   | /cerrar-sesion           | Cierrra la sesion                                              |
| 6   | get    | /index                   | Muestra lista de fotograma aleatorios                          |
| 7   | get    | /fotograma/detalles/:id  | Muestra los detalles del fotograma que selecciones (segun rol) |
| 8   | get    | /fotograma/crear         | Muestra el formulario de creacion de fotograma                 |
| 9   | post   | /fotograma/crear         | Guarda la informacion de un nuevo fotograma                    |
| 10  | get    | /tendencias              | Muestra grupos de fotograma en funcion de sus tags             |
| 11  | get    | /tendencias/detalles/:id | Muestra todos los uploads del tag seleccionado                 |
| 12  | post   | /fotograma/eliminar/:id  | Elimina el archivo subido (solo a nivel didactico)             |
| 13  | get    | /api                     | Ruta de la api                                                 |
| 14  | get    | /perfil                  | Renderiza form edicion perfil                                  |
| 15  | post   | /perfil                  | Guarda la informacion editada y redirige al inicio             |
