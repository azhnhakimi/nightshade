import DashboardUpcomingEventsPanelItem from './dashboard-upcoming-events-panel-item';

const data = [
    {
        eventName: 'Team standup',
        eventTime: '09:00 AM',
        eventSpace: 'Work',
    },
    {
        eventName: 'Dentist appointment',
        eventTime: '02:00 PM',
        eventSpace: 'Personal',
    },
    {
        eventName: 'Yoga class',
        eventTime: '06:00 PM',
        eventSpace: 'Fitness',
    },
];

const DashboardUpcomingEventsPanel = () => {
    return (
        <div className="my-4 flex flex-col gap-6 rounded-lg border-2 border-gray-100 bg-white px-4 py-6 shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-between border-b-1 border-gray-200 pb-4">
                <p className="text-lg font-semibold text-black">
                    Upcoming Events
                </p>
                <a
                    href="/"
                    className="text-sm text-[var(--purple-3)] hover:cursor-pointer hover:underline"
                >
                    View Calendar
                </a>
            </div>
            <div className="flex w-full flex-wrap items-stretch justify-start gap-4">
                {data &&
                    data.map((myEvent, index) => (
                        <DashboardUpcomingEventsPanelItem
                            event={myEvent}
                            key={index}
                        />
                    ))}
            </div>
        </div>
    );
};

export default DashboardUpcomingEventsPanel;
