import TasksCompletedTasksCard from './tasks-completed-tasks-card';
import TasksOverdueTasksCard from './tasks-overdue-tasks-card';
import TasksPendingTasksCard from './tasks-pending-tasks-card';
import TasksTotalTasksCard from './tasks-total-tasks-card';

const TasksQuickViewPanel = () => {
    return (
        <div className="flex w-full flex-wrap items-stretch justify-center gap-4">
            <TasksTotalTasksCard />
            <TasksCompletedTasksCard />
            <TasksPendingTasksCard />
            <TasksOverdueTasksCard />
        </div>
    );
};

export default TasksQuickViewPanel;
