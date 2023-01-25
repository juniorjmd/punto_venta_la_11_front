import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'ImgB64' ,
})


export class ImgB64Pipe implements PipeTransform {
    transform(srcImg:string | boolean ) {
        if (  srcImg  !== '' &&  srcImg != false ){
            return  'data:image/png;base64,'+srcImg ;
        }else{
            return 'assets/img/sinImagen.png' ; }
         
    }
}