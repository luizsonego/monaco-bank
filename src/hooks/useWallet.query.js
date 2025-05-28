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
const getTransactionId = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/movements/admin-get-movement?idTransaction=${id}`,
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
const getAdminTransactions = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/movements/admin-list-movements?id=${id}`,
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
const getAdminExtract = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/movements/request-movimentation`,
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

const getTransactionsPrint = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/movements/list-extract`,
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
const getDoc = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/envio-doc/view`,
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
const postCreateWithdraw = async (value) => {
  const { id, values } = value;
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/v1/profile/withdraw?id=${id}`,
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
const patchEditTransaction = async (value) => {
  const { id, values } = value;
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/v1/movements/admin-update-movement?idTransaction=${id}`,
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
const postCreateTransfer = async (value) => {
  const { id, values } = value;
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/v1/profile/transfer?id=${id}`,
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

const postCreatePrint = async (value) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/v1/movements/request-transactions`,
      value,
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

const postAcceptRequestMovimentation = async (id) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/v1/movements/accept-request-movimentation?id=${id}`
    );
    return data;
  }
  catch (error) {
    console.log("error: ", error);
  }
}

const postRejectRequestMovimentation = async (id) => {

  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/v1/movements/reject-request-movimentation?id=${id}`
    );
    return data;
  }
  catch (error) {
    console.log("error: ", error);
  }
  
}

const postCreateSendDoc = async (value) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/v1/envio-doc/create`,
      value,
    );
    return data;
  }
  catch (error) {
    console.log("error: ", error);
  }
}

export function useDocGet() {
  return useQuery({
    queryKey: ["doc"],
    queryFn: () => getDoc(),
  });
}

export function useCreateSendDoc(data) {
  return postCreateSendDoc(data);
}

export function usePrintPost(data) {
  return postCreatePrint(data);
}

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
export function useTransactionIdGet(id) {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactionId(id),
  });
}

export function useAdminTransactionsGet(id) {
  return useQuery({
    queryKey: ["admin-transactions"],
    queryFn: () => getAdminTransactions(id),
  });
}

export function useAdminExtractGet() {
  return useQuery({
    queryKey: ["admin-extract"],
    queryFn: () => getAdminExtract(),
  });
}

export function useTransactionsPrintGet() {
  return useQuery({
    queryKey: ["transactions-print"],
    queryFn: () => getTransactionsPrint(),
  });
}

export function useTransferPost(data) {
  return postCreateTransfer(data);
}
export function useApportPost(data) {
  return postCreateApport(data);
}
export function useWithdrawPost(data) {
  return postCreateWithdraw(data);
}
export function useEditTransaction(data) {
  return patchEditTransaction(data);
}

export function useAcceptRequestMovimentation(data) {
  return postAcceptRequestMovimentation(data);
}
export function useRejectRequestMovimentation(data) {
  return postRejectRequestMovimentation(data);
}
