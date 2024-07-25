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
