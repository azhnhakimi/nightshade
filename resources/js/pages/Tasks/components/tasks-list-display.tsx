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
import { router, usePage } from '@inertiajs/react';
import {
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Grid, Rows } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import TasksListItem from './tasks-list-item';

type Task = {
    id: number;
    name: string;
    details: string;
    priority: string;
    space: string;
    due_date: string;
    tags: string[];
    status: 'ongoing' | 'completed';
};

type GlobalFilter = {
    search: string;
    status?: 'ongoing' | 'completed';
    space?: string;
};

type PageProps = {
    tasks: Task[];
    flash?: {
        success?: string;
        error?: string;
    };
};

export default function TasksListDisplay() {
    const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');
    const [globalFilter, setGlobalFilter] = React.useState<GlobalFilter>({
        search: '',
        status: undefined,
        space: undefined,
    });

    const { tasks, flash } = usePage().props as unknown as PageProps;

    React.useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDeleteTask = (taskId: number, closeModal: () => void) => {
        router.delete(`/tasks/${taskId}`, {
            onSuccess: () => {
                closeModal();
            },
            onError: (errors: any) => {
                toast.error(
                    `Error performing task deletion: ${errors.message || errors}`,
                );
            },
        });
    };

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

            const matchesStatus =
                !filter.status || task.status.toLowerCase() === filter.status;

            const matchesSpace =
                !filter.space ||
                task.space.toLowerCase() === filter.space.toLowerCase();

            return matchesSearch && matchesStatus && matchesSpace;
        },
    });

    const rows = table.getRowModel().rows;

    return (
        <div className="my-4 w-full rounded-lg border-2 border-gray-100 bg-white px-4 py-6 shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
                {/* Search box */}
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

                {/* Status filter buttons */}
                <div className="flex w-fit gap-2">
                    {['all', 'ongoing', 'completed'].map((s) => (
                        <Button
                            key={s}
                            variant={
                                (globalFilter.status ?? 'all') === s
                                    ? 'default'
                                    : 'outline'
                            }
                            onClick={() =>
                                setGlobalFilter((prev) => ({
                                    ...prev,
                                    status:
                                        s === 'all'
                                            ? undefined
                                            : (s as 'ongoing' | 'completed'),
                                }))
                            }
                            className="flex-1 hover:cursor-pointer"
                        >
                            {s[0].toUpperCase() + s.slice(1)}
                        </Button>
                    ))}
                </div>

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
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                    </SelectContent>
                </Select>

                {/* View mode toggle */}
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

            {/* Tasks list/grid */}
            {viewMode === 'list' ? (
                <div>
                    {rows.map((row, index) => {
                        const task = row.original as Task;
                        return (
                            <div key={task.id}>
                                <TasksListItem
                                    key={task.id}
                                    task={task}
                                    onDelete={handleDeleteTask}
                                />
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
                                key={task.id}
                                className="rounded-lg border border-gray-200 p-4 shadow-sm"
                            >
                                <TasksListItem
                                    key={task.id}
                                    task={task}
                                    onDelete={handleDeleteTask}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
