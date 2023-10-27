import React, { useState } from "react";

const useHttp = () => {
  const [errMessage, setErrMessage] = useState("");

  const SendToHttp = async (
    request,
    resolveData,
    method,
    body_request,
    headers
  ) => {
    try {
      setErrMessage("");
      // console.log(request, method, body_request, headers);
      const res = await fetch(`http://localhost:5000/${request}`, {
        method: method ? method : "GET",
        body: body_request ? JSON.stringify(body_request) : null,
        headers: headers ? headers : {},
      });
      // console.log(res.status);
      const data = await res.json();
      if (res.status !== 200) {
        setErrMessage(data.message);
      }

      resolveData(data, !res.ok ? true : false);
      return res.status == 200 ? true : false;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    SendToHttp,
    errMessage,
  };
};
export default useHttp;
