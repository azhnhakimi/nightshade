import { Checkbox } from '@/components/ui/checkbox';
import { Flame } from 'lucide-react';

type Props = {
    habit: {
        habitName: string;
        habitStreakCount: string;
    };
};

const DashboardHabitPanelItem = ({ habit }: Props) => {
    return (
        <div className="flex w-full items-center justify-start gap-3 px-2 py-3">
            <Checkbox className="peer rounded-full p-2 data-[state=checked]:border-[var(--green-5)] data-[state=checked]:bg-[var(--green-5)]" />
            <div className="flex flex-col items-start justify-center">
                <p className="text-md mb-1 font-semibold text-black">
                    {habit.habitName}
                </p>
                <div className="flex items-center justify-start gap-2">
                    <Flame className="font-[400] text-[var(--orange-1)]" />
                    <p className="text-xs text-gray-500">
                        {habit.habitStreakCount} day streak
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHabitPanelItem;
