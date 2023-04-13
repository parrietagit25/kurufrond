import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

export const dowloadExcel = async(dataExcel: any) => {

  const workbook = new Workbook();

  createTablaExcel(dataExcel, workbook);

  workbook.xlsx.writeBuffer().then((data: any) => {
    const blob = new Blob([data]);
    fs.saveAs(blob, 'matchPanapass.xlsx');
  });
}

const createTablaExcel = async(dataExcel: any, workbook: any) => {
  const sheet = workbook.addWorksheet('Hoja1');
  const headerRow = sheet.getRow(1)!;

  headerRow.values = [
    //'RowNumber',
    'Tag',
    'Matricula',
    'UnitNumber',
    'RANumber',
    'Rollover',
    'Driver',
    'CustomerLastname',
    'arcust',
    'Company',
    'TrxOrigin',
    'ReferralCode',
    'LocationCodeOut',
    'DateOut',
    'DateIn',
    'FechaPase',
    'Monto',
    'CentroCosto',
  ];

  headerRow.font = { bold: true, size: 12 };

  const rowsToInsert = sheet.getRows(2, dataExcel.length)!;

  rowsToInsert.font = { size: 12 };

  for (let index = 0; index < rowsToInsert.length; index++) {
    const item = dataExcel[index];
    const row = rowsToInsert[index];

    row.values = [
      //item.RowNumber,
      item.Tag,
      item.Matricula,
      item.UnitNumber,
      item.RANumber,
      item.Rollover,
      item.Driver,
      item.CustomerLastname,
      item.arcust,
      item.Company,
      item.TrxOrigin,
      item.ReferralCode,
      item.LocationCodeOut,
      item.DateOut,
      item.DateIn,
      item.FechaPase,
      item.Monto,
      item.CentroCosto,
    ];
  }
}
