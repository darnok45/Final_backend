import app from './app.js';
import AppDatasource from './providers/data.source.js';
import pkg from 'signale';

// Importaciones para socket.io
import { socketHandler } from './websocket/socket.gateaway.js';
import { socketAuthMiddleware } from './middlewares/socketAuth.middleware.js';
import http from 'http';
import { Server } from 'socket.io'

// Configuracion del servidor HTTP y Socket.io
const server = http.createServer(app); // Creación del servidor HTTP basado en app
export const io = new Server(server, { // Inicializa la instancia de Socket.io
    cors: {
        origin: "*", // Permite conexiones desde cualquier origen (cors: abierto)
        methods: ["GET", "POST"] // Métodos que permite
    }
})

// Middleware para autenticar una conexion antes de establecerla
io.use(socketAuthMiddleware);

// Evento principal que se ejecuta con cada conexión con el servidor
io.on('connection', socketHandler)

// Inicialización de logger de Signale para mostrar mensajes con formato
const { Signale } = pkg;

const main = async () => {
    const logger = new Signale({ scope: 'Main' });
    const port = app.get('port');

    try {
        // 1. Primero realiza la conección a la base de datos
        await AppDatasource.initialize();
        logger.success('Connected to database');

        // 2. Inicia el servidor luego de la conexión con la base de datos
        server.listen(port, () => {
            logger.success(`Server running on port ${port}`);
        });

    } catch (err) {
        // Si ocurre un error al conectar con la base de datos lo muestra y terminar el proceso
        logger.error(`Unable to connect to database: ${err}`);
        process.exit(1);
    }
};

main();