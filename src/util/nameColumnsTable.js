export const columns = [
  { field: "employeeId", headerName: "COD", width: 70 },
  {
    field: "departmentName",
    headerName: "DEPART...",
    width: 90,
    editable: false,
  },
  {
    field: "employeeName",
    headerName: "NOMBRE",
    width: 110,
    editable: false,
  },
  {
    field: "commission",
    headerName: "COMISION",
    type: "number",
    width: 100,
    editable: false,
  },
  {
    field: "bonus",
    headerName: "BONIFICACION",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "honorary",
    headerName: "HONORARIOS",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "vale",
    headerName: "VALE",
    type: "number",
    width: 60,
    editable: false,
  },
  {
    field: "profuturo",
    headerName: "PROFUTURO",
    type: "number",
    width: 100,
    editable: false,
  },
  {
    field: "total",
    headerName: "TOTAL",
    type: "number",
    width: 80,
    editable: false,
  },
];

export const columnsCommission = [
{
  field: "dateCommision",
  headerName: "FECHA",
  width: 90,
  editable: false,
},
{ field: "codeEmployee", headerName: "Cod", width: 100 },
{
  field: "department",
  headerName: "DEPART...",
  width: 100,
  editable: false,
},
{
  field: "name",
  headerName: "NOMBRE",
  width: 200,
  editable: false,
},
{
  field: "commission",
  headerName: "COMISION",
  type: "number",
  width: 100,
  editable: false,
},
{
  field: "bonus",
  headerName: "BONIFICACION",
  type: "number",
  width: 130,
  editable: false,
},
{
  field: "honorary",
  headerName: "HONORARIOS",
  type: "number",
  width: 130,
  editable: false,
},
{
  field: "vale",
  headerName: "VALE",
  type: "number",
  width: 80,
  editable: false,
},
{
  field: "profuturo",
  headerName: "PROFUTURO",
  type: "number",
  width: 130,
  editable: false,
},
{
  field: "total",
  headerName: "TOTAL",
  type: "number",
  width: 110,
  editable: false,
},
]

export const columnsCustomerCategory = [
{
  field: "catCte",
  headerName: "CUENTA:",
  width: 200,
  editable: false,
},
{
  field: "mantenimiento",
  headerName: "MANTENIMIENTO %:",
  width: 200,
  editable: false,
},
{
  field: "crecimiento",
  headerName: "CRECIMIENTO %:",
  width: 160,
  editable: false,
},
{
  field: "nuevo",
  headerName: "NUEVO %:",
  width: 150,
  editable: false,
}
]

export const columnsUserRoles = [
{ field: "employeeId", headerName: "COD", width: 90 },
{
  field: "email",
  headerName: "EMAIL",
  width: 250,
  editable: false,
},
{
  field: "rol",
  headerName: "ROL",
  width: 200,
  editable: false,
},
{
  field: "departamento",
  headerName: "DEPARTAMENTO",
  type: "number",
  width: 150,
  editable: false,
},
]

export const columnsRangosTarifa = [
{ field: "id", headerName: "RANGOS", width: 150 },
{
  field: "minimo",
  headerName: "MINIMO",
  type: "number",
  width: 200,
  editable: false,
},
{
  field: "maximo",
  headerName: "MAXIMO",
  type: "number",
  width: 200,
  editable: false,
},
{
  field: "comision",
  headerName: "COMMISION",
  type: "number",
  width: 200,
  editable: false,
},
]

export const columnsTarifaVehiculo = [
{ field: "invclass", headerName: "CATEGORIA", width: 80 },
{
  field: "rate",
  headerName: "TARIFA",
  type: "number",
  width: 100,
  editable: false,
},
{
  field: "superOptimal",
  headerName: "SUPER OPTIMA",
  type: "number",
  width: 150,
  editable: false,
},
{
  field: "CentroCostos",
  headerName: "CENTRO COSTO",
  type: "number",
  width: 150,
  editable: false,
},
{
  field: "payment1",
  headerName: "COMISION 1",
  type: "number",
  width: 110,
  editable: false,
},
{
  field: "payment2",
  headerName: "COMISION 2",
  type: "number",
  width: 100,
  editable: false,
},
{
  field: "payment3",
  headerName: "COMISION 3",
  type: "number",
  width: 100,
  editable: false,
},
{
  field: "payment4",
  headerName: "COMISION 4",
  type: "number",
  width: 100,
  editable: false,
},
]

export const columnsCentroCosto = [
{ field: "centroCosto", headerName: "CENTRO COSTO", width: 180 },
{
  field: "mantenimiento",
  headerName: "MANTENIMIENTO",
  type: "number",
  width: 200,
  editable: false,
},
{
  field: "crecimiento",
  headerName: "CRECIMIENTO",
  type: "number",
  width: 200,
  editable: false,
},
{
  field: "nuevo",
  headerName: "NUEVO",
  type: "number",
  width: 200,
  editable: false,
}
]