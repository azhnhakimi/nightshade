import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const NotesHeader = () => {
    return (
        <div className="my-4 flex items-center justify-between">
            <div>
                <p className="text-2xl font-bold text-gray-800">
                    Notes & Journal
                </p>
                <p className="text-sm text-gray-500">
                    Capture your thoughts, ideas, and important information.
                </p>
            </div>
            <Link
                href={'/notes/create'}
                className="flex items-center justify-center gap-1 rounded-xl bg-[var(--purple-3)] px-4 py-2 transition-all duration-200 hover:cursor-pointer hover:bg-[var(--purple-2)]"
            >
                <Plus className="h-4 w-4 text-white" />
                <p className="text-white">Add Task</p>
            </Link>
        </div>
    );
};

export default NotesHeader;
