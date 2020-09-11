# full-stack-developer-test

Buenas tardes, esta es mi prueba para el cargo de full-stack developer, por cuestiones de carga elimine los node_modules pero con un npm install dentro de cada proyecto se descargaran y funcionará bien, realiace una estructura de 3 microservicios, estan correran en los puertos 3000, 3001, 3002.

El primero es el CRUD de los vehículos, este modelo lo realice con una colección en mondodb, con los atributos de placa, tipo, tiempo_acu, hora_entrada, adentro. Dentro del proyecto viene la configuración para la conexión a la base de datos vehículo.

El segundo microservicio es para el control de la entrada y salida de los vehiculos al estacionamiento, para ello tambien hice uso de la colección oficiales con los atributos placa, hora_entrada, hora_salida.

Y el tercer microservicio para las operaciones de conteo y generación del archivo de pagos.


La estructura la decidi de esta manera para separar el CRUD de los carros con el control de entrada y salida del estacionamiento y no saturar ninguno de los dos servicios. Los microservicios estan para conectarse a un Front como se describe en la prueba, los endpoints estan muy claros y faciles de entender para su conexión.


Muchas gracias por el tiempo y por tenerme en cuenta para la prueba y quedo pendiente del resultado.


Gracias.
