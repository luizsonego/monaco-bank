import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const postLogin = async (user) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/site/login`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
        validateStatus: function (status) {
          return true;
        },
      }
    );
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};
const postCreateUser = async (user) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/signup`,
      user,
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

const getRole = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/role`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          process.env.REACT_APP_ACCESS_TOKEN
        )}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export function useLoginPost(data) {
  return postLogin(data);
}
export function useCreateUserPost(data) {
  return postCreateUser(data);
}

export function useRoleGet() {
  return useQuery({
    queryKey: ["role"],
    queryFn: () => getRole(),
  });
}