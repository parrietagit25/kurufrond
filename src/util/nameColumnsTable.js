
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
    width: 300,
    editable: false,
  },
  {
    field: "crecimiento",
    headerName: "CRECIMIENTO %:",
    width: 150,
    editable: false,
  }
]