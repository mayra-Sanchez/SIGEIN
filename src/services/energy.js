import Axios from "axios";
import {endpoints, token} from "./index";

const list_energy_consumptions = async (body) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  };

  const response = await Axios.get(
    endpoints.energy.list_energy_consumption,
    body,
    config
  );
  return response.data;
};





export { list_energy_consumptions };
