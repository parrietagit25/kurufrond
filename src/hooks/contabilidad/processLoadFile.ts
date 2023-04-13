import { read, utils } from 'xlsx';

export const processLoadFile = (file: any) => {

    console.log('processLoadFile');
    

    const reader = new FileReader();

    reader.readAsBinaryString(file);

    const dataForm: any = {
        file: '',
        jsonData: {},
      };

    reader.onload = (event) => {
        let binaryData = event.target?.result;
        let workbook = read(binaryData, { type: 'binary' });
  
        const data = utils.sheet_to_json(workbook.Sheets['CARGA']);

        dataForm.jsonData = JSON.stringify(data);

        console.log(dataForm.jsonData );
        

        return dataForm.jsonData
    }
}
