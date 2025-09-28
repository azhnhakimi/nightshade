import { Clock3 } from 'lucide-react';

type Props = {
    event: {
        eventName: string;
        eventTime: string;
        eventSpace: string;
    };
};

const DashboardUpcomingEventsPanelItem = ({ event }: Props) => {
    return (
        <div className="flex flex-1 flex-col items-start justify-center gap-3 rounded-lg border-2 border-gray-100 bg-white px-4 py-6">
            <p className="text-md font-semibold text-black">
                {event.eventName}
            </p>
            <div className="flex items-center justify-start gap-1">
                <Clock3 className="h-3 w-3 text-gray-500" />
                <p className="text-sm text-gray-500">{event.eventTime}</p>
            </div>
            <p className="text-xs font-semibold text-gray-500">
                {event.eventSpace}
            </p>
        </div>
    );
};

export default DashboardUpcomingEventsPanelItem;
