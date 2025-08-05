import axios, { Axios } from "axios";
import { data } from "react-router";

const ApiFormData= axios.create({
    baseURL:'http://localhost:5000',
    withCredentials: true,
    headers: {
        "Content-Type":"multipart/form-data",
    },
});

const Api = axios.create({
    baseURL:'http://localhost:5000',
    //baseUrl:'http://localhost:5000',
    withCredentials:true,
    headers: {
        "Content-Type": "application/json"
    }
})

// Add request interceptor to include auth token
Api.interceptors.request.use(
  (config) => {
    // Get token from sessionStorage directly to avoid circular dependencies
    const tabId = sessionStorage.getItem('tabId');
    if (tabId) {
      const token = sessionStorage.getItem(`token_${tabId}`);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUserApi = (data) => {
  return  Api.post("api/login/login",data);
}

export const createUserApi = (data) =>
    ApiFormData.post("/api/users/createusers",data);

// Announcement APIs
export const getAllAnnouncementsApi = () => {
  return Api.get("/api/announcements");
};

export const createAnnouncementApi = (data) => {
  return Api.post("/api/announcements", data);
};

export const deleteAnnouncementApi = (id) => {
  return Api.delete(`/api/announcements/${id}`);
};

// User APIs
export const getAllUsersApi = () => {
  return Api.get("/api/users/getallusers");
};

export const getAllUsersPublicApi = () => {
  return Api.get("/api/users/getallusers-public");
};

// Cardio APIs
export const getAllCardioSessionsApi = () => {
  return Api.get("/api/cardio/sessions");
};

export const createCardioSessionApi = (data) => {
  return Api.post("/api/cardio/sessions", data);
};

export const updateCardioSessionApi = (id, data) => {
  return Api.put(`/api/cardio/sessions/${id}`, data);
};

export const deleteCardioSessionApi = (id) => {
  return Api.delete(`/api/cardio/sessions/${id}`);
};

// Weight Training APIs
export const getAllWeightSessionsApi = () => {
  return Api.get("/api/weight/sessions");
};

export const createWeightSessionApi = (data) => {
  return Api.post("/api/weight/sessions", data);
};

export const updateWeightSessionApi = (id, data) => {
  return Api.put(`/api/weight/sessions/${id}`, data);
};

export const deleteWeightSessionApi = (id) => {
  return Api.delete(`/api/weight/sessions/${id}`);
};

// Yoga APIs
export const getAllYogaSessionsApi = () => {
  return Api.get("/api/yoga/sessions");
};

export const createYogaSessionApi = (data) => {
  return Api.post("/api/yoga/sessions", data);
};

export const updateYogaSessionApi = (id, data) => {
  return Api.put(`/api/yoga/sessions/${id}`, data);
};

export const deleteYogaSessionApi = (id) => {
  return Api.delete(`/api/yoga/sessions/${id}`);
};

// Request APIs
export const createRequestApi = (data) => {
  return Api.post("/api/requests/create", data);
};

export const getUserRequestsApi = () => {
  return Api.get("/api/requests/user-requests");
};

export const getAllRequestsApi = () => {
  return Api.get("/api/requests/all");
};

export const getRequestByIdApi = (requestId) => {
  return Api.get(`/api/requests/${requestId}`);
};

export const respondToRequestApi = (requestId, data) => {
  return Api.put(`/api/requests/${requestId}/respond`, data);
};

// Test API to check if requests table exists
export const testRequestsApi = () => {
  return Api.get("/api/requests/test");
};
