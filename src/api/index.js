import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 accessToken 가져오기
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 토큰이 만료되어 401 에러가 발생한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 리프레시 토큰을 사용하여 새 액세스 토큰을 요청합니다
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await apiClient.post("/auth/refresh", {
          refreshToken,
        });
        const { token } = response.data;

        // 새 토큰을 저장하고 원래 요청을 재시도
        localStorage.setItem("token", token);
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우, 로그아웃 처리
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
