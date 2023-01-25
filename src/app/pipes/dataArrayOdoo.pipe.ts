import { Pipe, PipeTransform } from "@angular/core";
import { dfltAnswOdoo } from "../interfaces/clientes-odoo";

@Pipe({
    name:'dataArrayOdoo' ,
})


export class dataArrayOdooPipe implements PipeTransform {
    transform(srcImg:dfltAnswOdoo | boolean ) {
        if (   srcImg != false ){
            return  srcImg[1] ;
        }else{
            return false ; }
         
    }
}