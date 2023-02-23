import { apiRequest } from "@/utils/apiRequest";
import { ENV } from "@/utils/env";

const fetchProjects = () =>
  apiRequest.get(`${ENV.BACKEND_URL}/project/projects`);
const fetchAllProjects = () =>
  apiRequest.get(`${ENV.BACKEND_URL}/admin/projects`);
const fetchProject = (code) =>
  apiRequest.get(`${ENV.BACKEND_URL}/project/${code}`);
const createProject = (data) => apiRequest.post(`${ENV.BACKEND_URL}/pm/`, data);
const updateProject = (data) =>
  apiRequest.patch(`${ENV.BACKEND_URL}/project/`, data);
const addParticipant = (data) =>
  apiRequest.post(`${ENV.BACKEND_URL}/project/add-participant`, data);
const updateParticipant = (data) =>
  apiRequest.patch(`${ENV.BACKEND_URL}/project/update-participant`, data);
const fetchProjectTime = (code) =>
  apiRequest.get(`${ENV.BACKEND_URL}/project/${code}/commits`);

const updateTask = (task, projectId) =>
  apiRequest.patch(`${ENV.BACKEND_URL}/project/${projectId}/task/`, task);

export {
  fetchProject,
  fetchProjects,
  addParticipant,
  updateTask,
  fetchAllProjects,
  fetchProjectTime,
  updateParticipant,
  updateProject,
  createProject,
};
