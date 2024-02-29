import baseAxios from "../config/axios.config";

class ApiService {
  async Post(endpoint: string, data: any): Promise<any> {
    return await baseAxios.post(endpoint, data);
  }
  async GetAll(endpoint: string): Promise<any> {
    return await baseAxios.get(`${endpoint}`);
  }
  async GetById(endpoint: string, id: number | undefined): Promise<any> {
    return await baseAxios.get(`${endpoint}/${id}`);
  }
  async Patch(
    endpoint: string,
    id: number,
    key: string,
    data: any
  ): Promise<Response> {
    return await baseAxios.patch(`${endpoint}/${id}`, { [key]: data });
  }
  async Delete(endpoint: string, id: number): Promise<any> {
    return await baseAxios.delete(`${endpoint}/${id}`);
  }
  async PatchNew(endpoint: string, id: number, data: any): Promise<Response> {
    return await baseAxios.patch(`${endpoint}/${id}`, data);
  }
  async Search(
    endpoint: string,
    keyword: string | number,
    data: any
  ): Promise<any> {
    return await baseAxios.get(`${endpoint}/?${keyword}=${data}`);
  }
}
export default ApiService;
