import DashboardCompletionCard from './dashboard-completion-card';
import DashboardHabitsCard from './dashboard-habits-card.';
import DashboardNotesCard from './dashboard-notes-card';
import DashboardTasksCard from './dashboard-tasks-card';

const DashboardQuickViewPanel = () => {
    return (
        <div className="my-4 w-full">
            <div className="mx-auto flex flex-wrap items-stretch justify-center gap-4">
                <DashboardTasksCard />
                <DashboardHabitsCard />
                <DashboardNotesCard />
                <DashboardCompletionCard />
            </div>
        </div>
    );
};

export default DashboardQuickViewPanel;
