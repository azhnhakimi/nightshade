import { StickyNote } from 'lucide-react';

const NotesTotalNotesCard = () => {
    return (
        <div className="flex flex-1 items-center justify-between gap-10 rounded-lg border-2 border-gray-100 bg-white px-4 py-6 shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col">
                <p className="text-sm font-[500] text-gray-700">Total Notes</p>
                <p className="text-xl font-bold text-black">5</p>
            </div>
            <div className="rounded-lg bg-[var(--purple-5)] p-3">
                <StickyNote className="text-[var(--purple-3)]" />
            </div>
        </div>
    );
};

export default NotesTotalNotesCard;
