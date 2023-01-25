export class LocationOdoo {
    id  : number;
    name  :string ;
    complete_name  ?:string;
    active  ?: boolean;
    usage ?:string ;
    location_id ?: boolean | number| number[];
    child_ids ?: number[];
    comment ?: boolean;
    posx ?: number;
    posy ?: number;
    posz ?: number;
    parent_path ?:string ;
    company_id ?:any[];
    scrap_location ?: boolean| number| number[];
    return_location ?: boolean| number| number[];
    removal_strategy_id ?: boolean| number| number[];
    putaway_rule_ids ?: number| number[];
    barcode ?: boolean| number| number[];
    quant_ids ?:  boolean| number| number[];
    valuation_in_account_id ?:  boolean| number| number[];
    valuation_out_account_id ?:  boolean| number| number[];
    display_name ?:string;
    create_uid ?:  boolean| number| number[]| any[];
    create_date ?:Date;
    write_uid ?: boolean| number| number[]| any[];
    write_date ?:Date ;
    __last_update ?:Date;
     asignado?:string;
     nombreEsta?:string;
     idEsta?:number;
     tipLocacion?:string;
     constructor(){
        this.id = 0 ;
        this.name = '';
     }
           
}
