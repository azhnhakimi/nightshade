import TasksCompletedTasksCard from './tasks-completed-tasks-card';
import TasksOverdueTasksCard from './tasks-overdue-tasks-card';
import TasksPendingTasksCard from './tasks-pending-tasks-card';
import TasksTotalTasksCard from './tasks-total-tasks-card';

import { usePage } from '@inertiajs/react';

type PageProps = {
    stats: {
        total: string;
        completed: string;
        ongoing: string;
        past_due: string;
    };
};

const TasksQuickViewPanel = () => {
    const { stats } = usePage().props as unknown as PageProps;

    return (
        <div className="flex w-full flex-wrap items-stretch justify-center gap-4">
            <TasksTotalTasksCard count={stats.total} />
            <TasksCompletedTasksCard count={stats.completed} />
            <TasksPendingTasksCard count={stats.ongoing} />
            <TasksOverdueTasksCard count={stats.past_due} />
        </div>
    );
};

export default TasksQuickViewPanel;
