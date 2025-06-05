import {TaskManagement} from '../../screens';
import CreateTaskManagement from './Components/CreateTaskManagement';
import FileLinkScreen from './Components/FileLinkScreen';
import FilesScreen from './Components/FilesScreen';
import TargetLeader from './Components/TargetLeader';
import TaskDetailScreen from './Components/TaskDetailScreen';
import TaskFilter from './Components/TaskFilter';
import TaskItem from './Components/TaskItem';
import TaskList from './Components/TaskList';
import TaskOptionModal from './Components/TaskOptionModal';
import TextInputTaskManagement from './Components/TextInputTaskManagement';
import UpdateTaskManagement from './Components/UpdateTaskManagement';
import UploadFileModal from './Components/UploadFileModal';
import UploadLinkModal from './Components/UploadLinkModal';
import {
  setDepartment,
  setFilter,
  setTargetLeader,
  setTasksFilter,
} from './Services/TaskSlice';

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
  TaskItem,
  TaskList,
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
  TargetLeader,
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

// redux
export {setTargetLeader, setFilter, setDepartment, setTasksFilter};
