import { Flame } from 'lucide-react';

const DashboardHabitsCard = () => {
    return (
        <div className="flex flex-1 items-center justify-between gap-10 rounded-lg border-2 border-gray-100 bg-white px-4 py-6 shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col">
                <p className="text-sm font-[500] text-gray-700">
                    Habits Streak
                </p>
                <p className="text-xl font-bold text-black">12</p>
            </div>
            <div className="rounded-lg bg-[var(--green-7)] p-3">
                <Flame className="text-[var(--green-5)]" />
            </div>
        </div>
    );
};

export default DashboardHabitsCard;
