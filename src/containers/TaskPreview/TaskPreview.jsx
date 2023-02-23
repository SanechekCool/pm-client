import React, { useState } from "react";
import * as UI from "./TaskPreview.styles";

import { ParticipantAutocomplete } from "./ParticipantAutocomplete/ParticipantAutocomplete";
import {
  setSelectedTask,
  updateTask,
} from "../../actions/projectView/projectView";
import { useDispatch } from "react-redux";
import { Avatar, Input, Select } from "antd";
import { getAvatarCharacters } from "@/utils/user";
import { formatDateWithTime } from "../../utils/date";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { TaskStatus, TaskStatusToTitle } from "../../enums/Task";
import { useEffect } from "react";

const { TextArea } = Input;

const TaskPreview = ({ selectedTask, project }) => {
  const dispatch = useDispatch();

  const [selectedAsigneeId, setSelectedAsigneeId] = useState(
    selectedTask?.asignee
  );
  const [taskTitle, setTaskTitle] = useState(selectedTask?.title);
  const [taskEstimate, setTaskEstimate] = useState(selectedTask?.estimatedTime);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingEstimate, setIsEditingEstimate] = useState(false);
  const [taskDescription, setTaskDescription] = useState(
    selectedTask?.description
  );
  const [taskStatus, setTaskStatus] = useState(selectedTask?.status);

  const handleCloseTaskPreview = () => {
    dispatch(setSelectedTask(null));
  };

  useEffect(() => {
    if (selectedTask.status !== taskStatus) {
      setTaskStatus(selectedTask.status);
    }
  }, [selectedTask.status, taskStatus]);

  const taskCreator = useMemo(
    () =>
      project.participants.find(
        (participant) => participant.id === selectedTask.creatorId
      ),
    [project.participants, selectedTask.creatorId]
  );

  const handleChangeTaskTitle = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleChangeTaskEstimate = (e) => {
    setTaskEstimate(e.target.value);
  };

  const handleUpdateDescription = () => {
    dispatch(
      updateTask(
        {
          ...selectedTask,
          description: taskDescription,
        },
        project.id
      )
    );
  };

  const handleUpdateTitle = () => {
    dispatch(
      updateTask(
        {
          ...selectedTask,
          title: taskTitle,
        },
        project.id
      )
    );
    setIsEditingTitle(false);
  };

  const handleUpdateEstiamte = () => {
    dispatch(
      updateTask(
        {
          ...selectedTask,
          estimatedTime: taskEstimate,
        },
        project.id
      )
    );
    setIsEditingEstimate(false);
  };

  const handleChangeDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleSelectAsignee = (data) => {
    setSelectedAsigneeId(data);
    dispatch(
      updateTask(
        {
          ...selectedTask,
          asignee: data,
        },
        project.id
      )
    );
  };

  const handleChangeStatus = (data) => {
    setTaskStatus(data);
    dispatch(
      updateTask(
        {
          ...selectedTask,
          status: data,
        },
        project.id
      )
    );
  };

  const taskStatusOptions = useMemo(
    () =>
      Object.values(TaskStatus).map((status) => ({
        value: status,
        label: TaskStatusToTitle[status],
        disabled: status === taskStatus,
      })),
    [taskStatus]
  );

  return (
    <UI.Wrapper>
      <UI.StyledButton
        type="text"
        onClick={handleCloseTaskPreview}
        icon={<CloseCircleOutlined />}
      />
      {!isEditingTitle ? (
        <UI.TaskTitle onClick={() => setIsEditingTitle(true)}>
          {taskTitle}
        </UI.TaskTitle>
      ) : (
        <Input
          value={taskTitle}
          onChange={handleChangeTaskTitle}
          onBlur={handleUpdateTitle}
        />
      )}
      <UI.InputWrapper>
        <UI.FieldLabel>Описание</UI.FieldLabel>
        <TextArea
          onBlur={handleUpdateDescription}
          onChange={handleChangeDescription}
          value={taskDescription}
        />
      </UI.InputWrapper>
      <UI.InputWrapper>
        <UI.FieldLabel>Статус</UI.FieldLabel>
        <Select
          value={taskStatus}
          onChange={handleChangeStatus}
          options={taskStatusOptions}
        />
      </UI.InputWrapper>
      <UI.InputWrapper>
        <UI.FieldLabel>Первоначальное время</UI.FieldLabel>
        {!isEditingEstimate ? (
          <UI.TaskEstimate onClick={() => setIsEditingEstimate(true)}>
            {taskEstimate}
          </UI.TaskEstimate>
        ) : (
          <Input
            value={taskEstimate}
            onChange={handleChangeTaskEstimate}
            onBlur={handleUpdateEstiamte}
          />
        )}
      </UI.InputWrapper>
      <UI.InputWrapper>
        <UI.FieldLabel>Исполнитель</UI.FieldLabel>
        <ParticipantAutocomplete
          participants={project.participants}
          asigneeId={selectedAsigneeId}
          onSelect={handleSelectAsignee}
        />
      </UI.InputWrapper>
      {taskCreator && (
        <UI.InputWrapper>
          <UI.FieldLabel>Автор</UI.FieldLabel>
          <UI.ParticipantWrapper>
            <Avatar
              style={{
                backgroundColor: taskCreator.user.avatarColor,
              }}
            >
              {getAvatarCharacters(taskCreator.user)}
            </Avatar>
            <p style={{ marginLeft: "2rem" }}>
              {taskCreator.user.firstName} {taskCreator.user.lastName}
            </p>
          </UI.ParticipantWrapper>
        </UI.InputWrapper>
      )}
      <UI.InputWrapper>
        <UI.FieldLabel>Создано</UI.FieldLabel>
        {formatDateWithTime(selectedTask.createdAt)}
      </UI.InputWrapper>

      <UI.InputWrapper>
        <UI.FieldLabel>Обновлено</UI.FieldLabel>
        {formatDateWithTime(selectedTask.updatedAt)}
      </UI.InputWrapper>
    </UI.Wrapper>
  );
};

export { TaskPreview };
