# Task Manager - Ensolvers  

Para el desarrollo del proyecto elegí utilizar Spring Boot para la API, React para el frontend y Mysql para la persistencia de los datos.

La API está escrita en Java y usa el paquete Spring Web. Sigue una arquitectura de controladores, modelos y repositorios. El paquete de Spring Web proporciona soluciones limpias y flexibles para aplicaciones que siguen esta arquitectura. A pesar de que se puede mejorar en aspectos como testing y manejo de errores pude alcanzar el nivel de robustez buscado. 

Con el uso de la herramienta de Facebook, create-react-app, rápidamente puse en funcionamiento el ambiente de desarrollo de React para empezar con las vistas. Con algunos componentes pude cumplir con los requerimientos, siguiendo una arquitectura SAP. La calidad del código fue sufriendo impactos a medida que las vistas se iban complejizando. A pesar de esto y de haber sacrificado algunos principios de UX, pude alcanzar la solidez necesaria a nivel de lógica y consistencia de los datos.

Para el delivery utilicé la herramienta docker, creé containers separados para el backend, frontend y otro para la base de datos. Con docker-compose los orquestré para correrlos de manera conjunta en forma sencilla.

## Requisitos

- Gradle v7.0
- Java JDK 16.0.1
- Docker
- Docker compose

## Instalación

Clonar el código
```bash
git clone https://github.com/Xeitor/TaskManager-FullProject-v2.git
```
Una vez dentro del repositorio ejecutamos el script init.sh. 

```bash
./init.sh
```
Primero ejecuta un 'gradle build' para generar un .jar de la aplicación de Spring Boot y luego un docker build para crear una imagen de docker a partir del Dockerfile definido. Luego se ejecuta otro 'docker build' para crear la imagen de la app de React.

Con el comando 'docker images' podemos corroborar que las siguientes imagenes se hayan creado correctamente:
- xeitor/task-manager-spring
- task-manager-react

## Usar la aplicación

Para correr la aplicación ejecutar el siguiente comando:

```bash
docker-compose up
```

Con 'docker ps' podemos corroborar que los 3 container se encuentren corriendo.
La interfaz gráfica corre en http://localhost:3000.
