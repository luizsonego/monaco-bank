import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getConversations = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/conversation`,
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

const postCreateConversation = async (value) => {
  console.log("values: ", value);
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/v1/conversation/create`,
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

const getMessageId = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/v1/conversation/view?id=${id}`,
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

const postMessageId = async (values) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/v1/message/send?conversationId=${values.conversation_id}`,
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

const postCreateTask = async (values) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/v1/task/create`,
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

export function useConversationGet() {
  return useQuery({
    queryKey: ["conversation"],
    queryFn: () => getConversations(),
  });
}
export function useConversationPost(data) {
  return postCreateConversation(data);
}
export function useMessageIdGet(id) {
  return useQuery({
    queryKey: ["message-id"],
    queryFn: () => getMessageId(id),
  });
}
export function useMessageIdPost(data) {
  return postMessageId(data);
}
export function useCreateTaskPost(data) {
  return postCreateTask(data);
}