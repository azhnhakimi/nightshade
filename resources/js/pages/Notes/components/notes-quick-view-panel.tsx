import NotesPinnedNotesCard from './notes-pinned-notes-card';
import NotesTotalNotesCard from './notes-total-notes-card';
import NotesTotalTagsCard from './notes-total-tags-card';
import NotesTotalWordsCard from './notes-total-words-card';

const NotesQuickViewPanel = () => {
    return (
        <div className="flex w-full flex-wrap items-stretch justify-center gap-4">
            <NotesTotalNotesCard />
            <NotesPinnedNotesCard />
            <NotesTotalWordsCard />
            <NotesTotalTagsCard />
        </div>
    );
};

export default NotesQuickViewPanel;
