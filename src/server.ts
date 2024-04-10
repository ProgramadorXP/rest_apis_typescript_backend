import express from 'express'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'  
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import router from './router'
import db from './config/db'

//Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue('Conexión exitosa a la BD'))
    } catch (error) {
        //console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la BD'))
    }
}
connectDB()

//Instancia de express
const server = express()

//Permitir conexiones con CORS
const corsOptions : CorsOptions = {
    origin: (origin, callback) => {
        //Permitimos la conexion al dominio que definimos en nuestra variable de entorno
        if(origin === process.env.FRONTEND_URL) {
            //Pasamos como parametro un error como null porque si queremos permitir la conexiona ese dominio
            //Segundo parametro le decimos que si 
            callback(null, true)
        } else {
            //Denegamos la conexion
            callback((new Error('Error de CORS')))
        }
    }
}
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server