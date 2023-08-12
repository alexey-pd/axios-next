import axios from "axios";

const createClient = () => axios.create();

const client = createClient();

client.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res.data;
  }

  return res;
});

export { client };
