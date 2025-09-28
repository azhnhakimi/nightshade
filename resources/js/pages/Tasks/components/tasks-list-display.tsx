import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { usePage } from '@inertiajs/react';
import {
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Grid, Rows } from 'lucide-react';
import * as React from 'react';

import TasksListItem from './tasks-list-item';

type Task = {
    id: number;
    name: string;
    details: string;
    priority: string;
    space: string;
    due_date: string;
    tags: string[];
};

type GlobalFilter = {
    search: string;
    priority?: string;
    space?: string;
};

export default function TasksListDisplay() {
    const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');
    const [globalFilter, setGlobalFilter] = React.useState<GlobalFilter>({
        search: '',
        priority: undefined,
        space: undefined,
    });
    const [priorityFilter, setPriorityFilter] = React.useState<
        string | undefined
    >(undefined);
    const [spaceFilter, setSpaceFilter] = React.useState<string | undefined>(
        undefined,
    );

    const { tasks } = usePage().props as unknown as { tasks: any[] };

    const columns = React.useMemo(
        () => [
            {
                accessorKey: 'name',
            },
            {
                accessorKey: 'details',
            },
            {
                accessorKey: 'tags',
                // flatten tags for filtering
                accessorFn: (row: Task) => row.tags.join(' '),
            },
        ],
        [],
    );

    const table = useReactTable({
        data: tasks,
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: (row, columnId, filter: GlobalFilter) => {
            const task: Task = row.original;
            const search = (filter.search ?? '').toLowerCase();

            const name = (task.name ?? '').toLowerCase();
            const details = (task.details ?? '').toLowerCase();
            const tags = task.tags?.map((t) => (t ?? '').toLowerCase()) ?? [];

            const matchesSearch =
                name.includes(search) ||
                details.includes(search) ||
                tags.some((tag) => tag.includes(search));

            const matchesPriority =
                !filter.priority ||
                task.priority.toLowerCase() === filter.priority.toLowerCase();

            const matchesSpace =
                !filter.space ||
                task.space.toLowerCase() === filter.space.toLowerCase();

            return matchesSearch && matchesPriority && matchesSpace;
        },
    });

    const rows = table.getRowModel().rows;
    console.log(
        'Rows after filter:',
        rows.map((r) => r.original),
    );

    return (
        <div className="my-4 w-full rounded-lg border-2 border-gray-100 bg-white px-4 py-6 shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
            <div className="mb-4 flex items-center justify-between gap-2">
                <Input
                    placeholder="Search tasks..."
                    value={globalFilter.search}
                    onChange={(e) =>
                        setGlobalFilter((prev) => ({
                            ...prev,
                            search: e.target.value,
                        }))
                    }
                    className="max-w-2xl"
                />
                <div className="flex w-fit gap-2">
                    {['low', 'medium', 'high'].map((p) => (
                        <Button
                            key={p}
                            variant={
                                globalFilter.priority === p
                                    ? 'default'
                                    : 'outline'
                            }
                            onClick={() =>
                                setGlobalFilter((prev) => ({
                                    ...prev,
                                    priority:
                                        prev.priority === p ? undefined : p,
                                }))
                            }
                            className="flex-1"
                        >
                            {p[0].toUpperCase() + p.slice(1)}
                        </Button>
                    ))}
                </div>

                {/* Space dropdown stays the same */}
                <select
                    value={globalFilter.space ?? ''}
                    onChange={(e) =>
                        setGlobalFilter((prev) => ({
                            ...prev,
                            space: e.target.value || undefined,
                        }))
                    }
                >
                    <option value="">All spaces</option>
                    <option value="work">Work</option>
                    <option value="fitness">Fitness</option>
                    <option value="personal">Personal</option>
                </select>
                <div className="flex items-center gap-2">
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('list')}
                    >
                        <Rows className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('grid')}
                    >
                        <Grid className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {viewMode === 'list' ? (
                <div>
                    {rows.map((row, index) => {
                        const task = row.original as Task;
                        return (
                            <div key={task.id}>
                                <TasksListItem task={task} />
                                {index !== rows.length - 1 && (
                                    <Separator className="my-4" />
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {rows.map((row) => {
                        const task = row.original as Task;
                        return (
                            <div
                                key={task.name}
                                className="rounded-lg border border-gray-200 p-4 shadow-sm"
                            >
                                <TasksListItem task={task} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
