import api from "./instance";

type Props = (URL: string, params?: object) => any;

export const getRequest: Props = async (URL, params) => {
  const { data } = await api.get(`/${URL}`, { params });

  return data;
};
