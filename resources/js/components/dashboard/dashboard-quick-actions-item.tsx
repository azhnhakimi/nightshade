import type { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';

export type QuickAction = {
    actionName: string;
    actionIcon: keyof typeof Icons;
    actionLink: string;
    iconColor: string;
};

type Props = {
    action: QuickAction;
};

const DashboardQuickActionsPanelItem = ({ action }: Props) => {
    const Icon = Icons[action.actionIcon] as LucideIcon;
    return (
        <a
            href={action.actionLink}
            className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border-2 border-gray-100 bg-white px-4 py-6 transition-all duration-400 hover:border-[var(--purple-3)]"
        >
            <Icon className={`h-6 w-6 ${action.iconColor}`} />
            <p className="text-md text-center font-semibold text-gray-800">
                {action.actionName}
            </p>
        </a>
    );
};

export default DashboardQuickActionsPanelItem;
