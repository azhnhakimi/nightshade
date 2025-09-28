import AppLayout from '@/layouts/app-layout';

import TaskHeader from './components/tasks-header';
import TasksListDisplay from './components/tasks-list-display';
import TasksQuickViewPanel from './components/tasks-quick-view-panel';

const TasksIndex = () => {
    return (
        <AppLayout>
            <div className="h-full w-full bg-[var(--background-white)] px-6 py-4">
                <TaskHeader />
                <TasksQuickViewPanel />
                <TasksListDisplay />
            </div>
        </AppLayout>
    );
};

export default TasksIndex;
