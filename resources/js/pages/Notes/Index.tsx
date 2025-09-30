import AppLayout from '@/layouts/app-layout';

import NotesHeader from './components/notes-header';
import NotesListDisplay from './components/notes-list-display';
import NotesQuickViewPanel from './components/notes-quick-view-panel';

const NotesIndex = () => {
    return (
        <AppLayout>
            <div className="h-full w-full bg-[var(--background-white)] px-6 py-4">
                <NotesHeader />
                <NotesQuickViewPanel />
                <NotesListDisplay />
            </div>
        </AppLayout>
    );
};

export default NotesIndex;
