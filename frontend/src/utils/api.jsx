import axios from "./axios";
import { toast } from "react-toastify";

const getData = ({ path, type, accessToken, payload }) => {
  if (type === "post")
    return axios.post(`/${path}`, payload, {
      headers: { authorization: `Bearer ${accessToken}` },
    });

  if (type === "put")
    return axios.put(`/${path}`, payload, {
      headers: { authorization: `Bearer ${accessToken}` },
    });

  if (type === "delete")
    return axios.delete(`/${path}`, {
      headers: { authorization: `Bearer ${accessToken}` },
      data: payload,
    });

  return axios.get(`/${path}`, {
    headers: { authorization: `Bearer ${accessToken}` },
  });
};

export const useAxios = async ({
  path,
  type = "get",
  payload,
  navigate,
  successCb,
  errorCb,
  finallyCb,
}) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token?.accessToken && token?.refreshToken) {
    try {
      const res = await getData({
        path,
        type,
        accessToken: token?.accessToken,
        payload,
      });

      if (res.status === 200) {
        successCb?.(res);
        toast.success(res.data?.message);
      }
    } catch (err) {
      errorCb?.(err);
      if (
        err?.response?.status === 403 &&
        err?.response?.data?.message === "Token Is Nolonger Valid"
      ) {
        return useAxios({
          path: "token",
          type: "post",
          payload: { refreshToken: token?.refreshToken },
          navigate,
          successCb: (res) => {
            localStorage.setItem(
              "token",
              JSON.stringify({ ...token, ...res.data })
            );
            useAxios({
              path,
              type,
              payload,
              navigate,
              successCb,
              errorCb,
              finallyCb,
            });
          },
          errorCb: (err) => {
            console.log("🚀 ~ file: api.jsx:62 ~ err:", err);
            localStorage.clear();
            navigate("/signin");
          },
        });
      }
      toast.error(err?.response?.data?.message);
    } finally {
      finallyCb?.();
    }
  } else {
    navigate("/signin");
  }
};
