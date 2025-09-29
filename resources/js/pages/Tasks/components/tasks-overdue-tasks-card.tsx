import { Siren } from 'lucide-react';

type Props = {
    count: string;
};

const TasksOverdueTasksCard = ({ count }: Props) => {
    return (
        <div className="flex flex-1 items-center justify-between gap-10 rounded-lg border-2 border-gray-100 bg-white px-4 py-6 shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col">
                <p className="text-sm font-[500] text-gray-700">Overdue</p>
                <p className="text-xl font-bold text-[var(--red-1)]">{count}</p>
            </div>
            <div className="rounded-lg bg-[var(--red-2)] p-3">
                <Siren className="text-[var(--red-1)]" />
            </div>
        </div>
    );
};

export default TasksOverdueTasksCard;
