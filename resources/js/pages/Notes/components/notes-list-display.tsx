import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Grid, Rows } from 'lucide-react';
import * as React from 'react';

import NotesListItem from './notes-list-item';

type Note = {
    title: string;
    content: string;
    tags: string[];
    lastUpdated: string;
    wordCount: string;
    space: string;
};

type GlobalFilter = {
    search: string;
    space?: string;
};

const mockData: Note[] = [
    {
        title: 'Project Meeting Notes',
        content:
            'The project team convened to review current progress, upcoming milestones, and potential challenges...',
        tags: ['meeting', 'roadmap', 'planning'],
        lastUpdated: '1/10/2024',
        wordCount: '89',
        space: 'Work',
    },
    {
        title: 'Design Review Notes',
        content:
            'The design team gathered to present the latest mockups for the user dashboard...',
        tags: ['design', 'ui/ux', 'review'],
        lastUpdated: '28/9/2024',
        wordCount: '79',
        space: 'Work',
    },
    {
        title: 'Personal Budget Planning',
        content:
            'This month’s budget focuses on balancing savings and discretionary spending...',
        tags: ['finance', 'personal', 'planning'],
        lastUpdated: '25/9/2024',
        wordCount: '72',
        space: 'Personal',
    },
    {
        title: 'Book Summary – Atomic Habits',
        content:
            'The book emphasizes how small, consistent changes can lead to remarkable long-term results...',
        tags: ['reading', 'self-improvement', 'summary'],
        lastUpdated: '20/9/2024',
        wordCount: '84',
        space: 'Personal',
    },
];

export default function NotesListDisplay() {
    const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');
    const [globalFilter, setGlobalFilter] = React.useState<GlobalFilter>({
        search: '',
        space: undefined,
    });

    const columns = React.useMemo(
        () => [
            { accessorKey: 'title' },
            { accessorKey: 'content' },
            {
                accessorKey: 'tags',
                accessorFn: (row: Note) => row.tags.join(' '),
            },
        ],
        [],
    );

    const table = useReactTable({
        data: mockData,
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: (row, columnId, filter: GlobalFilter) => {
            const note: Note = row.original;
            const search = (filter.search ?? '').toLowerCase();

            const title = (note.title ?? '').toLowerCase();
            const content = (note.content ?? '').toLowerCase();
            const tags = note.tags?.map((t) => (t ?? '').toLowerCase()) ?? [];

            const matchesSearch =
                title.includes(search) ||
                content.includes(search) ||
                tags.some((tag) => tag.includes(search));

            const matchesSpace =
                !filter.space ||
                note.space.toLowerCase() === filter.space.toLowerCase();

            return matchesSearch && matchesSpace;
        },
    });

    const rows = table.getRowModel().rows;

    return (
        <div className="my-4 w-full rounded-lg border-2 border-gray-100 bg-white px-4 py-6 shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
            {/* Filters + Controls */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
                {/* Search box */}
                <Input
                    placeholder="Search notes..."
                    value={globalFilter.search}
                    onChange={(e) =>
                        setGlobalFilter((prev) => ({
                            ...prev,
                            search: e.target.value,
                        }))
                    }
                    className="max-w-2xl"
                />

                {/* Space filter */}
                <Select
                    value={globalFilter.space ?? 'all'}
                    onValueChange={(value) =>
                        setGlobalFilter((prev) => ({
                            ...prev,
                            space: value === 'all' ? undefined : value,
                        }))
                    }
                >
                    <SelectTrigger className="max-w-[150px]">
                        <SelectValue placeholder="Select space" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All spaces</SelectItem>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                    </SelectContent>
                </Select>

                {/* View toggle */}
                <div className="flex items-center gap-2">
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('list')}
                        className="hover:cursor-pointer"
                    >
                        <Rows className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('grid')}
                        className="hover:cursor-pointer"
                    >
                        <Grid className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Notes list/grid */}
            {viewMode === 'list' ? (
                <div>
                    {rows.map((row, index) => {
                        const note = row.original as Note;
                        return (
                            <div key={index}>
                                <NotesListItem note={note} />
                                {index !== rows.length - 1 && (
                                    <Separator className="my-4" />
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {rows.map((row, index) => {
                        const note = row.original as Note;
                        return (
                            <div
                                key={index}
                                className="rounded-lg border border-gray-200 p-4 shadow-sm"
                            >
                                <NotesListItem note={note} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
