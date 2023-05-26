import { useDispatch } from "react-redux";
import { read, utils } from "xlsx";

import configApi from "../../api/configApi";
import { onLogout, clearErrorMessage } from "../../store/auth";
import { dowloadExcel, messages } from "..";

export const panapass = () => {
  const dispatch = useDispatch();

  const { messageError, messageSuccess } = messages();

  const processMatchPanapass = async (flagRollover) => {
    try {
      await configApi.get("/clear-tables");

      await configApi.get("/process-ena");

      await configApi.get("/process-tb-rentWork");

      const result = await configApi.get(
        "/process-match-panapass/" + flagRollover
      );

      const { data, status } = result.data;

      const listRollover = [];

      if (status.id == 200) {
        if (flagRollover) {
          for (let item of data) {
            if (item.Rollover == "1") {
              listRollover.push(item);
            }
          }

          dowloadExcel(listRollover);
          messageSuccess(status.name);
        } else {
          dowloadExcel(data);
          messageSuccess(status.name);
        }
      } else {
        messageError(status.name);
      }
    } catch (error) {
      dispatch(onLogout(error.code));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const loadToIntelisis = async (file) => {
    try {
      const flag = false;

      const reader = new FileReader();

      reader.readAsBinaryString(file);

      reader.onload = async (event) => {
        let binaryData = event.target?.result;
        let workbook = read(binaryData, { type: "binary" });

        const data = utils.sheet_to_json(workbook.Sheets["CARGA"]);

        const dataList = JSON.parse(JSON.stringify(data));

        const resul = await configApi.post("/load-to-intelisis/", dataList);

        resul.data.status.id === 200
          ? messageSuccess(resul.data.status.name)
          : messageError(resul.data.status.name);
      };
    } catch (error) {
      dispatch(onLogout(error.code));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  return {
    //* Propiedades

    //* Metodos
    processMatchPanapass,
    loadToIntelisis,
  };
};
