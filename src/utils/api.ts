import axios from "axios";

export const apiCall = async ({
  reqMethod,
  endPoint,
  params = {},
  queryParams = {},
  body = {},
  userAccessToken = "",
}: {
  reqMethod: string;
  endPoint: string;
  params?: Record<string, any>;
  queryParams?: Record<string, any>;
  body?: Record<string, any>;
  userAccessToken?: string;
}) => {
  try {
    const result: any = await axios({
      method: reqMethod.toLowerCase(),
      url: `${process.env.REACT_APP_REST_API_ENDPOINT}${endPoint}`,
      headers: {
        ...(userAccessToken && { Authorization: `Bearer ${userAccessToken}` }),
      },
      data: body,
    });
    return result?.data;
  } catch (error) {
    return error;
  }
};
