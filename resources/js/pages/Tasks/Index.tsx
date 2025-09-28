import { Sheet } from '@/components/ui/sheet';
import AppLayout from '@/layouts/app-layout';

import React from 'react';
import TaskSheet from './components/task-sheet';
import TaskHeader from './components/tasks-header';
import TasksListDisplay from './components/tasks-list-display';
import TasksQuickViewPanel from './components/tasks-quick-view-panel';

const TasksIndex = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <AppLayout>
            <div className="h-full w-full bg-[var(--background-white)] px-6 py-4">
                <Sheet open={open} onOpenChange={setOpen}>
                    <TaskHeader />
                    <TasksQuickViewPanel />
                    <TasksListDisplay />
                    <TaskSheet setOpen={setOpen} />
                </Sheet>
            </div>
        </AppLayout>
    );
};

export default TasksIndex;
