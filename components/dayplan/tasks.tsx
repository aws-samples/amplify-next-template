import useTasks from "@/api/useTasks";
import { isTodayOrFuture } from "@/helpers/functional";
import { FC, useState } from "react";
import TaskForm from "./task-form";
import SubmitButton from "../ui-elements/submit-button";
import Task from "./task";

type TasksProps = {
  day: string;
  dayPlanId: string;
};

const Tasks: FC<TasksProps> = ({ day, dayPlanId }) => {
  const { tasks, loadingTasks, createTask, switchProjectTaskDone } =
    useTasks(dayPlanId);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  return (
    <div>
      <section>
        {loadingTasks && <div>Loading tasks...</div>}
        {tasks?.map((task) => (
          <Task key={task.id} task={task} switchDone={switchProjectTaskDone} />
        ))}
      </section>

      {isTodayOrFuture(day) && showAddTaskForm && (
        <TaskForm
          onSubmit={createTask(dayPlanId, () => setShowAddTaskForm(false))}
        />
      )}

      {isTodayOrFuture(day) && !showAddTaskForm && (
        <SubmitButton onClick={() => setShowAddTaskForm(true)}>
          Add task
        </SubmitButton>
      )}
    </div>
  );
};

export default Tasks;
