const URL = "http://localhost:8000";

const endpoints = {
  clients: {
    registerClients: `${URL}/clients/create-client/`,
    listAll: `${URL}/clients/list-all/`,
    updateClienteInfo: (id) => `${URL}/clients/update-info/${id}/`,
    client_bill: (id) => `${URL}/bills/user_bill/${id}/`,
    contract: (id) => `${URL}/contracts/find-id-contract/${id}`
  },

  employees: {
    registerEmployees: `${URL}/employees/create-employee/`,
    listAll: `${URL}/employees/list-all/`,
    updateEmployesInfo: (id) => `${URL}/employees/update-info/${id}/`,
  },

  users: {
    registerUser: `${URL}/users/register-user/`,
    loginUser: `${URL}/users/login/`,
    updateActive: (id) => `${URL}/users/${id}/update-info/`,
  },

  energy: {
    list_energy_consumption: `${URL}/energy-products/list-energy-consumptions/`,
    client_energy_consumption: (id) =>
      `${URL}/energy-products/energy_consumption/${id}`,
    csv_energy_consumptions: `${URL}/energy-products/csv-energy-consumptions/`,
    create_payment: `${URL}/payments/create-payment/`,
  },

  roles: {},
};

const token = () => {
  let aux = localStorage.getItem("userData");
  aux = JSON.parse(aux);
  const tokenAcces = aux.access;
  return tokenAcces;
};

export { endpoints, token };


