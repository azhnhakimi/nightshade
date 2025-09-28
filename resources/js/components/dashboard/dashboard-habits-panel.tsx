import DashboardHabitPanelItem from './dashboard-habits-panel-item';

const data = [
    {
        habitName: 'Morning meditation',
        habitStreakCount: '7',
    },
    {
        habitName: 'Read 30 minutes',
        habitStreakCount: '12',
    },
    {
        habitName: 'Drink 8 glasses water',
        habitStreakCount: '3',
    },
];

const DashboardHabitsPanel = () => {
    return (
        <div className="flex flex-1 flex-col gap-6 rounded-lg border-2 border-gray-100 bg-white px-4 py-6 shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-between border-b-1 border-gray-200 pb-4">
                <p className="text-lg font-semibold text-black">
                    Habits Progress
                </p>
                <a
                    href="/"
                    className="text-sm text-[var(--purple-3)] hover:cursor-pointer hover:underline"
                >
                    View all
                </a>
            </div>
            <div className="flex w-full flex-col items-center justify-center">
                {data &&
                    data.map((habit, index) => (
                        <DashboardHabitPanelItem habit={habit} key={index} />
                    ))}
            </div>
        </div>
    );
};

export default DashboardHabitsPanel;
