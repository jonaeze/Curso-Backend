/*Sirrve para customizar el llamado al proceso de NODE, es decir agregarle al comando opciones/parametros personalizados*/
import { Command } from "commander";

const commander = new Command();

/*agrego a mi commander las opciones/parametros personalizados*/

commander.option("--mode <mode>", "Modo de trabajo", "development").parse();

export default commander;
