import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const TaskHeader = () => {
    return (
        <div className="my-4 flex items-center justify-between">
            <div>
                <p className="text-2xl font-bold text-gray-800">
                    Tasks & Projects
                </p>
                <p className="text-sm text-gray-500">
                    Organize and track your daily tasks and long term projects.
                </p>
            </div>
            <Link
                href={''}
                className="flex items-center justify-center gap-1 rounded-xl bg-[var(--purple-3)] px-4 py-2 transition-all duration-200 hover:bg-[var(--purple-2)]"
            >
                <Plus className="h-4 w-4 text-white" />
                <p className="text-white">Add Task</p>
            </Link>
        </div>
    );
};

export default TaskHeader;
