import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getProfile = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/profile`,
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
const getAdminProfile = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/profile/admin-user?id=${id}`,
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

const getAllProfiles = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/profile/list-investors`,
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

const getNewProfiles = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/site/new-users`,
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
const getDeletedProfiles = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/site/user-blocked`,
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

const getProfilesDescription = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/profile/description?id=${id}`,
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

const putProfile = async (data) => {
  const { id, values } = data;
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_API}/v1/profile/update?id=${id}`,
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
const putProfileActive = async (dataUser) => {
  console.log(dataUser);
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_API}/v1/site/activate-user`,
      dataUser,
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
const putProfileDelete = async (dataUser) => {
  console.log(dataUser);
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_API}/v1/site/delete`,
      dataUser,
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

export function useProfileGet() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });
}
export function useAdminProfileGet(id) {
  return useQuery({
    queryKey: ["profile-admin"],
    queryFn: () => getAdminProfile(id),
  });
}

export function useProfilesGet() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: () => getAllProfiles(),
  });
}

export function useNewProfilesGet() {
  return useQuery({
    queryKey: ["new_profiles"],
    queryFn: () => getNewProfiles(),
  });
}
export function useDeletedProfilesGet() {
  return useQuery({
    queryKey: ["deleted_profiles"],
    queryFn: () => getDeletedProfiles(),
  });
}

export function useProfileDescriptionGet(id) {
  return useQuery({
    queryKey: ["profile-description"],
    queryFn: () => getProfilesDescription(id),
  });
}

export function useProfilePut(data) {
  return putProfile(data);
}
export function useProfileActive(data) {
  return putProfileActive(data);
}
export function useProfileDelete(data) {
  return putProfileDelete(data);
}
