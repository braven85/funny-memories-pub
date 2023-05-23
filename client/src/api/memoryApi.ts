import axiosClient from "./axiosClient";

const memoryEndpoint = "memories";

interface Memory {
  id: string;
  child: string;
  content: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

const memoryApi = {
  getAllMemories: () => axiosClient.get<Memory[], any>(memoryEndpoint),
  createNewMemory: (params: any) => axiosClient.post(memoryEndpoint, params),
  getOneChildsMemories: (childName: any) =>
    axiosClient.get<Memory[], any>(`${memoryEndpoint}/${childName}`),
  updateMemory: (id: any, params: any) => axiosClient.put(`${memoryEndpoint}/${id}`, params),
  deleteMemory: (id: any) => axiosClient.delete(`${memoryEndpoint}/${id}`),
};

export default memoryApi;
