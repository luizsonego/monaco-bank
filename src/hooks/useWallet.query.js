import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getWallet = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/movements/wallet`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            process.env.REACT_APP_ACCESS_TOKEN
          )}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
const getTransactions = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/movements/list-movements`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            process.env.REACT_APP_ACCESS_TOKEN
          )}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

const postCreateApport = async (value) => {
  const { id, values } = value;
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/v1/profile/investiment?id=${id}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            process.env.REACT_APP_ACCESS_TOKEN
          )}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export function useWalletGet() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: () => getWallet(),
  });
}

export function useTransactionsGet() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });
}

export function useApportPost(data) {
  return postCreateApport(data);
}
