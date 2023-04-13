import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

export const dowloadExcelComercial = async(dataExcel: any) => {

  const workbook = new Workbook();

  createTablaExcel(dataExcel, workbook);

  workbook.xlsx.writeBuffer().then((data: any) => {
    const blob = new Blob([data]);
    fs.saveAs(blob, 'comisionesCorp.xlsx');
  });
}

const createTablaExcel = async(dataExcel: any, workbook: any) => {
  const sheet = workbook.addWorksheet('Hoja1');
  const headerRow = sheet.getRow(1)!;

  headerRow.values = [
    'Mov',
    'NombreCte',
    'Categoria',
    'Articulo',
    'Sucursal',
    'FechaEmision',
    'CCDescription',
    'LocationCodeOut',
    'LocationCodeIn',
    'Company',
    'VIN',
    'InvClass',
    'Model',
    'ReferralCode',
    'NameReferrailCode',
    'RANumber',
    'Cantidad',
    'SubTotal',
    'Impuestos',
    'ImporteTotal',
  ];

  headerRow.font = { bold: true, size: 12 };

  const rowsToInsert = sheet.getRows(2, dataExcel.length)!;

  rowsToInsert.font = { size: 12 };

  for (let index = 0; index < rowsToInsert.length; index++) {
    const item = dataExcel[index];
    const row = rowsToInsert[index];

    row.values = [
        item.Mov,
        item.NombreCte,
        item.Categoria,
        item.articulo,
        item.sucursal,
        item.FechaEmision,
        item.CCDescription,
        item.LocationCodeOut,
        item.LocationCodeIn,
        item.Company,
        item.VIN,
        item.InvClass,
        item.Model,
        item.ReferralCode,
        item.NameReferrailCode,
        item.RANumber,
        item.Cantidad,
        item.SubTotal,
        item.Impuestos,
        item.ImporteTotal,
      ];
  }
}
