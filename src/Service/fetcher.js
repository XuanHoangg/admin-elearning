import axios from "axios";

const fetcher = axios.create({
    baseURL: "https://elearningnew.cybersoft.edu.vn/api",

    headers: {
        TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMiIsIkhldEhhblN0cmluZyI6IjE1LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTUxNjgwMDAwMCIsIm5iZiI6MTY1MzkzMDAwMCwiZXhwIjoxNjgxNjY0NDAwfQ.oR9K8iSTqbo-t0Q_a-WFnKePPaMAr7sdlgR5xKAtQWA",
    },
});
// interceptors: là nơi trung gian mà api trước khi request lên server sẽ đứng tại đây và xử lý các thao tác ta yâu cầu
fetcher.interceptors.response.use(
    // thành công
    (reponse) => {
        // transform kết quả của reponse trước khi trả ra nơi gọi request
        return reponse.data.content || reponse.data;
    },
    // thất bại
    (error) => {
        console.log(error);
        localStorage.setItem("deleteSuccess", error.response.data)
        // transform error trước khi trả ra nơi gọi request
        // error.repponse.data : format axios
        // .content: format của cybersorft
        return Promise.reject(error.response.data.content);
    }
);

fetcher.interceptors.request.use(
    (config) => {
        // thêm authorization vào header config (nếu có)
        const { accessToken } = JSON.parse(localStorage.getItem("user")) || {};
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default fetcher;
