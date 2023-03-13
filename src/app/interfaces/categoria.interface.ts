export interface Categoria {
    'id' :number;
    'name' :string;
    'parent_id' :number;
    'child_id' :number;
    'parent_path' :string;
    'complete_name' :string;
    'create_date' :string;
    'write_date' :string;
    '__last_update' :string;
    'property_account_income_categ_id' :number;
    'property_account_expense_categ_id' :number;
    'product_count' :number;
    'fecha' :string;
    'hora' :string;
    'tipoDescripcion' ?:string,
}
