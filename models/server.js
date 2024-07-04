const express = require('express')
const cors = require ('cors');
const { dbConnection } = require('../datebase/config');


class Server {


    constructor() {

        this.app = express();
        this.port= process.env.PORT || 3000;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares (Funcion que siempre va a ejecutarse cuando levante el srv)
        this.middlewares();
        
        //Rutas de mi aplicacion
        this.routes();
    }


    async conectarDB() {
        await dbConnection()
    }

    //Que es un middleware? Es una funcion que se ejecuta ANTES de llamar a un controlador
    // o seguir con la ejecucion de mis peticiones
    middlewares(){

        //CORS
        this.app.use(cors () );
        
        //Lectura y parseo del body
        this.app.use( express.json() );
        
        //Directorio publico
        this.app.use( express.static('public') );

    }


    routes () {
        //si necesito crear mas rutas irian aca
        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.usuariosPath, require('../routes/usuarios') );
       
       
          
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto:', this.port);
        });
    }

}


module.exports = Server;
