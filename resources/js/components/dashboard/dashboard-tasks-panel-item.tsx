import { Checkbox } from '@/components/ui/checkbox';

type Props = {
    task: {
        taskName: string;
        taskPriority: string;
        taskSpace: string;
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

const DashboardTasksPanelItem = ({ task }: Props) => {
    return (
        <div className="flex w-full items-center justify-start gap-2">
            <Checkbox className="peer data-[state=checked]:border-[var(--purple-2)] data-[state=checked]:bg-[var(--purple-2)]" />

            <div className="flex flex-col gap-1 px-2 py-4">
                <p className="text-md font-semibold text-black">
                    {task.taskName}
                </p>
                <div className="flex items-center justify-start gap-3">
                    <p
                        className={`text-xs font-semibold ${getTextColor(task.taskPriority)} ${getBackgroundColor(task.taskPriority)} rounded-3xl px-3 py-1`}
                    >
                        {task.taskPriority}
                    </p>
                    <p className="text-xs font-semibold text-gray-500">
                        {task.taskSpace}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardTasksPanelItem;
