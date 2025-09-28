import { Checkbox } from '@/components/ui/checkbox';
import { CircleSmall, Pencil, Trash2 } from 'lucide-react';

type Props = {
    task: {
        taskName: string;
        taskDetails: string;
        taskPriority: string;
        taskSpace: string;
        taskDueDate: string;
        taskTags: string[];
    };
};

const textColorMap: Record<string, string> = {
    high: 'text-[var(--red-1)]',
    medium: 'text-[var(--yellow-3)]',
    low: 'text-[var(--green-4)]',
};

const bgColorMap: Record<string, string> = {
    high: 'bg-[var(--red-2)]',
    medium: 'bg-[var(--yellow-4)]',
    low: 'bg-[var(--green-6)]',
};

const getTextColor = (priority: string): string => textColorMap[priority];
const getBackgroundColor = (priority: string): string => bgColorMap[priority];

const TasksListItem = ({ task }: Props) => {
    return (
        <div className="flex items-center justify-start gap-4">
            <Checkbox className="data-[state=checked]:border-[var(--green-5)] data-[state=checked]:bg-[var(--green-5)]" />
            <div className="flex-1 space-y-2">
                <p className="text-lg font-semibold text-gray-800">
                    {task.taskName}
                </p>
                <p className="text-sm text-gray-600">{task.taskDetails}</p>
                <div className="flex items-center justify-start gap-4">
                    <p
                        className={`text-xs ${getTextColor(task.taskPriority)} ${getBackgroundColor(task.taskPriority)} rounded-2xl px-3 py-1 font-semibold`}
                    >
                        {task.taskPriority}
                    </p>
                    <div className="flex items-center justify-start">
                        <CircleSmall className="h-2 w-2 rounded-full bg-[var(--purple-3)] text-[var(--purple-3)]" />
                        <p className="text-sm text-gray-500">
                            {task.taskSpace}
                        </p>
                    </div>
                    <p className="text-sm text-gray-500">
                        Due: {task.taskDueDate}
                    </p>
                </div>
                <div className="flex flex-wrap items-center justify-start gap-1">
                    {task.taskTags &&
                        task.taskTags.map((tag, index) => (
                            <div
                                key={index}
                                className="w-max rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-800"
                            >
                                #{tag}
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex items-center justify-center gap-4 self-start">
                <Pencil className="h-4 w-4 text-gray-500 transition duration-200 hover:cursor-pointer hover:text-[var(--blue-2)]" />
                <Trash2 className="h-4 w-4 text-gray-500 transition duration-200 hover:cursor-pointer hover:text-[var(--red-1)]" />
            </div>
        </div>
    );
};

export default TasksListItem;
