import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 5000, // 요청 타임아웃 설정
});

export const signupApi = async (email, password) => {
  try {
    const response = await instance.post(
      "/auth/signup",
      {
        email: email,
        password: password,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const signinApi = async (email, password) => {
  try {
    const response = await instance.post(
      "/auth/signin",
      {
        email: email,
        password: password,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      return {
        data: { message: "아이디 또는 비밀번호가 잘못되었습니다" },
      };
    } else {
      return error.response;
    }
  }
};
export const getTodoApi = async (token) => {
  try {
    const response = await instance.get("/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
export const createTodoApi = async (token, todo) => {
  try {
    const response = await instance.post(
      "/todos",
      {
        todo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const updateTodoApi = async (token, todo, id, isCompleted) => {
  try {
    const response = await instance.put(
      `/todos/${id}`,
      {
        todo,
        isCompleted,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteTodoApi = async (token, id) => {
  try {
    const response = await instance.delete(`/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
