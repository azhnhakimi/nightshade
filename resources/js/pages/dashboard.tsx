import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import DashboardHabitsPanel from '@/components/dashboard/dashboard-habits-panel';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import DashboardQuickActionsPanel from '@/components/dashboard/dashboard-quick-actions-panel';
import DashboardQuickViewPanel from '@/components/dashboard/dashboard-quick-view-panel';
import DashboardTasksPanel from '@/components/dashboard/dashboard-tasks-panel';
import DashboardUpcomingEventsPanel from '@/components/dashboard/dashboard-upcoming-events-panel';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="h-full w-full bg-[var(--background-white)] px-6 py-4">
                <DashboardHeader />
                <DashboardQuickViewPanel />
                <div className="flex w-full flex-wrap items-stretch justify-between gap-4">
                    <DashboardTasksPanel />
                    <DashboardHabitsPanel />
                </div>
                <DashboardUpcomingEventsPanel />
                <DashboardQuickActionsPanel />
            </div>
        </AppLayout>
    );
}
