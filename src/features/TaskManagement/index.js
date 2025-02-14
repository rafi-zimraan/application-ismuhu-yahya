import {TaskManagement} from '../../screens';
import CreateTaskManagement from './Components/CreateTaskManagement';
import FileLinkScreen from './Components/FileLinkScreen';
import FilesScreen from './Components/FilesScreen';
import TaskDetailScreen from './Components/TaskDetailScreen';
import TaskFilter from './Components/TaskFilter';
import TaskOptionModal from './Components/TaskOptionModal';
import TextInputTaskManagement from './Components/TextInputTaskManagement';
import UpdateTaskManagement from './Components/UpdateTaskManagement';
import UploadFileModal from './Components/UploadFileModal';
import UploadLinkModal from './Components/UploadLinkModal';
import {
  addFileTaskManagement,
  addLinkTaskManagement,
  addTaskManagement,
  deleteFileTaskManagement,
  deleteLinkTaskManagement,
  deleteTaskManagement,
  getAllTaskManagement,
  getDetailLinkTaskManagement,
  getDetailTaskManagement,
  getFilesTaskManagement,
  updateDataTaskManagement,
  updateLinkTaskManagement,
  updateStatusRencanaTask,
} from './Services/TaskApiSlice';

// component
export {
  TaskManagement,
  UploadLinkModal,
  UploadFileModal,
  TextInputTaskManagement,
  UpdateTaskManagement,
  FilesScreen,
  TaskOptionModal,
  FileLinkScreen,
  TaskDetailScreen,
  TaskFilter,
};
// slice
export {
  getFilesTaskManagement,
  addFileTaskManagement,
  deleteFileTaskManagement,
  updateStatusRencanaTask,
  getDetailLinkTaskManagement,
  addLinkTaskManagement,
  updateLinkTaskManagement,
  deleteLinkTaskManagement,
  deleteTaskManagement,
  CreateTaskManagement,
  getAllTaskManagement,
  addTaskManagement,
  getDetailTaskManagement,
  updateDataTaskManagement,
};
