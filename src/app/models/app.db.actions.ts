
// actions para servicio crud

 const actionDelete = '3f1b76f2d7c28054c92ab1d00ef626b45ab80a8a';
 const actionUpdate = '9d9fa03fe878f82f47b0befd5421049b989eb5d2';
 const actionAsignarCajas = 'qwer12356yhn7ujm8ik';
 const actionInsert = 'da5cbea2f73b029d0ce3a1dc2a05a46e7f0461c4';
 const actionProcedure = 'da5195132f73b029d0ce3a1dc2a05a46e7f0461c4';
 const actionSelect = 'e06c06e7e4ef58bdb0cf1858541b3017fdd35473';
 const actionlogin = 'ef2e1d89937fba9f888516293ab1e19e7ed789a5';
 const actionSelectPorUsuario = 'e06c06e7e4ef58bdbdd35473wdc741qaz';
 const actionTipDocOdoo = 'BUSCAR_ODOO_TIPO_ID' ;
 const actionEmpresasOdoo = 'BUSCAR_ODOO_TIPO_COMPANIA';

 const actionAbrirCaja = 'ABRIR_CAJA_ACTIVA';
 const actionCerarCaja = 'CERRAR_CAJA_ACTIVA';
 
 const actionSelectCajasPorUsuario = 'mnbvcxzxcxcxasdfewq15616';
 const actionInsertSE = 'e251ba9c423f96654579e892fd50d50a38337616';
 const actionDeleteSE = 'b0ecfb6a24fa75f0108286c898f3dea3158655d2';
 const actionConfirmar = '54cf0ad78873b07d7756976e37b6ed1e659a573f';
 const actionUsuario = '781e41a4c6237dbaecab19579643041de310c041';
 const insert_orden_pregunta = '99c505a66a9d8a984059baf1b99bb9e6456ae4bb';
 const generarPDF = '23929870008e23007350be74a708ab3a806dce13';
 const resultadoSimulacro = '8e9ae038c37d3b59fc1eed456c77aefb5eadffea';
 const cambioContrasena = '52444d9072f7ec12a26cb2879ebb4ab0bf5aa553';
 const datosInicialesSucursal = 'GET_SUCURSAL_PRINCIPAL_DATA'
 const validarLlave = '16770d92a6a82ee846f7ff23b4c8ad05b69fba03';
 const actionResumenCaja = 'OBTENER_RESUMEN_CAJA';
 const actionInsertPerfilUsuario = 'INSERT_PERFIL_USUARIO'; 
 const actionCrearDocumentos = 'CREAR_DOCUMENTO_POR_USUARIO' ; 

 const actionCerarDocumentos = 'CREAR_STOCK_PICKING_FINAL' ; 
 const actionChangeDocumentos = 'CAMBIAR_DOCUMENTO_ACTIVO_POR_USUARIO' ; 
 const actionCancelarDocumentos = 'CANCELAR_DOCUMENTO_POR_USUARIO' ; 
 const actionCambioCajaDocumento = 'CAMBIAR_DOCUMENTO_POR_CAJA';
 const actionBuscarProducto = 'BUSCAR_PRODUCTO';
 const actionCategoriasdoo = 'BUSCAR_ODOO_CATEGORIAS';
 const actionCategoriasPrddoo = 'BUSCAR_ODOO_CATEGORIAS_PRD'
 const actionAsignarPagosDoc = 'ASIGNAR_PAGOS_DOCUMENTOS';
 const STOCK_MOVE = 'STOCK_MOVE';
 const STOCK_MOVE_DEVOLUCION = 'STOCK_MOVE_DEVOLUCION';
 const actionBuscarMarcas = 'BUSCAR_MARCAS';
 const actionCerarCajaParcial = 'CERRAR_CAJA_PARCIAL';
 const actionCambiarDocADomicilio = 'CAMBIAR_DOCUMENTO_A_ENVIO'; 

 export const actions = {
  'actionCambiarDocADomicilio' : actionCambiarDocADomicilio,
  'actionCancelarDocumentos' : actionCancelarDocumentos,
  'actionCerarCajaParcial' : actionCerarCajaParcial,
   'actionAbrirCaja': actionAbrirCaja,
   'actionCrearDocumentos' : actionCrearDocumentos,
   'actionResumenCaja': actionResumenCaja,
    'actionCerarCaja': actionCerarCaja, 
    'actionCerarDocumentos':actionCerarDocumentos,
    'datosInicialesSucursal' : datosInicialesSucursal,
    'actionAsignarDocumentosPagos':actionAsignarPagosDoc , 
    'actionBuscarMarcas' : actionBuscarMarcas,
    'actionAsignarCajas':actionAsignarCajas,
    'actionDelete' :actionDelete ,
    'actionUpdate' :actionUpdate ,
    'actionInsert' :actionInsert ,
    'actionProcedure' :actionProcedure,
    'actionSelect' :actionSelect ,
    'actionBuscarPaisesOdoo' : 'BUSCAR_ODOO_PAIS',
    'actionBuscarStatesOdoo' : 'BUSCAR_ODOO_DEP',
    'actionBuscarCiudadOdoo' : 'BUSCAR_ODOO_CIUDAD',
    'actionTipDoc' :actionTipDocOdoo,
    'actionCategoriasOdoo' :actionCategoriasdoo,
    'actionCategoriasPrdOdoo' :actionCategoriasPrddoo,
    'actionEmpresasOdoo' :actionEmpresasOdoo,
    'actionTitulosOdoo' :'BUSCAR_ODOO_TITULO_PERSONA',
    'actionBuscarLocacionesExternas' : 'BUSCAR_STOCK_LOCATION',
    'actionInsertPerfilUsuario' : actionInsertPerfilUsuario,
    'actionSelectPorUsuario' :actionSelectPorUsuario,
    'actionlogin' :actionlogin ,
    'actionValidarKeylogin' :validarLlave,
    'actionSelCajaXuser' :actionSelectCajasPorUsuario,
    'actionInsertSE' :actionInsertSE ,
    'actionCambioCajaDocumento' :actionCambioCajaDocumento,
    'actionDeleteSE' :actionDeleteSE ,
    'actionConfirmar' :actionConfirmar ,
    'actionUsuario' :actionUsuario ,
    'insert_orden_pregunta' :insert_orden_pregunta ,
    'generarPDF' :generarPDF ,
    'resultadoSimulacro' :resultadoSimulacro ,
    'cambioContrasena' :cambioContrasena     ,
    'buscarProducto' :actionBuscarProducto    ,
    'actionChangeDocumentos' : actionChangeDocumentos , 
    'actionStockMove' : STOCK_MOVE ,
    'actionStockMoveDevolucion' : STOCK_MOVE_DEVOLUCION ,
    'actionSelectClienteOdoo' : 'BUSCAR_ODOO_CLIENTES' ,
    'actionCrearClienteOdoo' : 'CREAR_CLIENTE_NUEVO_ODOO',
    'actionCrearClienteOdooPlusDoc' : 'CREAR_CLIENTE_NUEVO_ODOO_PLUS_DOC',
    'actionActualizarClienteOdoo' : 'ACTUALIZAR_CLIENTE_ODOO',
    'actionPasarClienteAControl' : 'CREAR_CLIENTE_ODOO_A_CONTROL'
    }