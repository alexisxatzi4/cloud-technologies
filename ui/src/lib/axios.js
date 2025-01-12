import axios from "axios";

const api = axios.create();

export const axiosGet = async (url, parameters) => {
  return await api.get(url, {
    params: {...parameters},
  })
    .catch((error) => {
      if (!error.response) {
        error.errorMessage = 'Something went wrong. Please contact a System Administrator';
      } else {
        error.errorMessage = error.response.data;
      }
      throw error;
    });
};


export const axiosPost = async (url, data) => {
  return await api.post(url, data, {
    "Content-Type": "application/json",
  })
    .catch((error) => {
      console.log('error ', error)
      if (!error.response) {
        error.errorMessage = 'Something went wrong. Please contact a System Administrator';
      } else {
        error.errorMessage = error.response.data;
      }
      throw error;
    });
};


export const axiosPut = async (url, data) => {
  return await api.put(url, data, {
    "Content-Type": "application/json",
  })
    .catch((error) => {
      if (!error.response) {
        error.errorMessage = 'Something went wrong. Please contact a System Administrator';
      } else {
        error.errorMessage = error.response.data;
      }
      throw error;
    })
};


export const axiosDelete = async (url) => {
  return await api.delete(url)
    .catch((error) => {
      if (!error.response) {
        error.errorMessage = 'Something went wrong. Please contact a System Administrator';
      } else {
        error.errorMessage = error.response.data;
      }
      throw error;
    })
};