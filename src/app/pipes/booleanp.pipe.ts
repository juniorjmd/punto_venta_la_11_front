import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'booleanP' ,
})


export class booleanpPipe implements PipeTransform {
    transform(srcImg:number| string | boolean ) {
        console.log(srcImg)
        if (  srcImg  === '0' ){
            return  'No' ;
        }else{
            return  'Si' ; }
         
    }
}