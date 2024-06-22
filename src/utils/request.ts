import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface Config {
  baseUrl: string;
  headers: any; // 根据实际情况指定headers的类型
}
const baseUrl='/api'
class HttpRequest {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getInsideConfig(): Config {
    const config: Config = {
      baseUrl: this.baseUrl,
      headers: {},
    };
    return config;
  }

  public request(options: AxiosRequestConfig): Promise<AxiosResponse> {
    options = { ...this.getInsideConfig(), ...options };
    const instance: AxiosInstance = axios.create();
    this.interception(instance);
    return instance(options);
  }

  private interception(instance: AxiosInstance): void {
    instance.interceptors.request.use(
      function (config: any) {
        return config;
      },
      function (error: any) { // 这里可以根据具体情况修改参数类型
        return Promise.reject(error);
      }
    );
  
    instance.interceptors.response.use(
      function (response: AxiosResponse) {
        return response;
      },
      function (error: any) { // 这里可以根据具体情况修改参数类型
        return Promise.reject(error);
      }
    );
  }
  
}
//@ts-ignore
export default new HttpRequest(baseUrl);
