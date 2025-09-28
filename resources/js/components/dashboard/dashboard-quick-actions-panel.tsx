import DashboardQuickActionsPanelItem, {
    type QuickAction,
} from './dashboard-quick-actions-item';

const data: QuickAction[] = [
    {
        actionName: 'Add Task',
        actionIcon: 'Plus',
        actionLink: '#',
        iconColor: 'text-[var(--purple-3)]',
    },
    {
        actionName: 'New Habit',
        actionIcon: 'Repeat',
        actionLink: '#',
        iconColor: 'text-[var(--green-5)]',
    },
    {
        actionName: 'Write Note',
        actionIcon: 'StickyNote',
        actionLink: '#',
        iconColor: 'text-[var(--purple-3)]',
    },

    {
        actionName: 'Add Event',
        actionIcon: 'Calendar',
        actionLink: '#',
        iconColor: 'text-[var(--yellow-3)]',
    },
];

const DashboardQuickActionsPanel = () => {
    return (
        <div className="my-4 flex flex-col gap-6 rounded-lg border-2 border-gray-100 bg-white px-4 py-6 shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-between border-b-1 border-gray-200 pb-4">
                <p className="text-lg font-semibold text-black">
                    Quick Actions
                </p>
            </div>
            <div className="flex w-full flex-wrap items-stretch justify-center gap-4">
                {data &&
                    data.map((action, index) => (
                        <DashboardQuickActionsPanelItem
                            action={action}
                            key={index}
                        />
                    ))}
            </div>
        </div>
    );
};

export default DashboardQuickActionsPanel;
