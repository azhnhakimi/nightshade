import { CircleSmall, Pencil, Pin, Trash2 } from 'lucide-react';

type Props = {
    note: {
        title: string;
        content: string;
        tags: string[];
        lastUpdated: string;
        wordCount: string;
        space: string;
    };
};

const NotesListItem = ({ note }: Props) => {
    return (
        <div className="flex gap-4">
            <div className="flex flex-1 flex-col items-start justify-start gap-4">
                <p className="text-lg font-semibold text-gray-800">
                    {note.title}
                </p>
                <p className="text-sm text-gray-600">
                    {note.content.length > 300
                        ? note.content.substring(0, 300) + '...'
                        : note.content}
                </p>
                <div className="flex flex-wrap items-center justify-start gap-1">
                    {note.tags &&
                        note.tags.map((tag, index) => (
                            <p
                                key={index}
                                className="w-max rounded-md bg-[var(--purple-5)] px-2 py-1 text-xs font-semibold text-[var(--purple-3)]"
                            >
                                #{tag}
                            </p>
                        ))}
                </div>
                <div className="flex gap-4">
                    <p className="text-sm text-gray-500">{note.lastUpdated}</p>
                    <p className="text-sm text-gray-500">
                        {note.wordCount} words
                    </p>
                    <div className="flex items-center justify-start gap-1">
                        <CircleSmall className="h-2 w-2 rounded-full bg-[var(--purple-3)] text-[var(--purple-3)]" />
                        <p className="text-sm text-gray-500">{note.space}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-start justify-center gap-4">
                <Pin
                    className="h-4 w-4 text-gray-500 hover:cursor-pointer hover:text-[var(--purple-2)]"
                    fill="var(--purple-2)"
                />
                <Pencil className="h-4 w-4 text-gray-500 hover:cursor-pointer hover:text-[var(--blue-2)]" />
                <Trash2 className="h-4 w-4 text-gray-500 hover:cursor-pointer hover:text-[var(--red-1)]" />
            </div>
        </div>
    );
};

export default NotesListItem;
