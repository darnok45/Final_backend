/*
    Archivo principal que maneja los eventos de conexión para socket.io
    Este se ejecutara cada vez que un nuevo usuario se conecte correctamente al servidor Websocket
*/
export const socketHandler = (socket) => {
    // El middleware de socketAuth ya guardó los datos del usuario autenticado en socket.handshake.auth
    const user = socket.handshake.auth; 

    // Verificación de auth y que el usuario tenga un id valido
    if (user && user.id) {
        // El usuario se une a una "sala" privada para enviar mensajes
        socket.join(`user-${user.id}`); 
        console.log(`Usuario ${user.nombre} conectado. Rol: ${user.rol}. Sala: user-${user.id}`);

        // Prueba para envio de mensaje del usuario
        socket.on("message", (data) => {
            console.log(`Mensaje de ${user.nombre} recibido:`, data);
        });

        // Función que se ejecuta cuando el usuario se desconecta del servidor
        socket.on("disconnect", () => {
            console.log(`Usuario ${user.nombre} desconectado`);
        });
    } else {
        // Si no hay datos del usuario o si no se puede verificar el JWT se fuerza la desconexión
        socket.disconnect(true); 
    }
}