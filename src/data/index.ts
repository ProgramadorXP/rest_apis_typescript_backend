import { exit } from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({force: true})
        console.log('Datos eliminados correctamente')
        //Exist significa que finaliza correctamente 
        //Puede ser exit(0) ó exit()
        exit()
    } catch (error) {
        console.log(error)
        //Significa que finalizó con errores
        exit(1)
    }
}

if(process.argv[2] === '--clear') {
    clearDB()
}

console.log(process.argv)