import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Grid, Rows } from 'lucide-react';
import * as React from 'react';

import TasksListItem from './tasks-list-item';

type Task = {
    taskName: string;
    taskDetails: string;
    taskPriority: string;
    taskSpace: string;
    taskDueDate: string;
    taskTags: string[];
};

const data: Task[] = [
    {
        taskName: 'Update project documentation',
        taskDetails: 'Document new API endpoints and update README',
        taskPriority: 'medium',
        taskSpace: 'Work',
        taskDueDate: '12/01/2025',
        taskTags: ['documentation', 'development'],
    },
    {
        taskName: 'Read 30 pages of current book',
        taskDetails: 'Continue reading "Atomic Habits" by James Clear',
        taskPriority: 'low',
        taskSpace: 'Personal',
        taskDueDate: '11/01/2025',
        taskTags: ['reading', 'self-improvement'],
    },
];

export default function TasksListDisplay() {
    const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');
    const [globalFilter, setGlobalFilter] = React.useState('');

    // columns aren’t really needed since you’re not rendering a table
    // but we need the table instance for search/filter state
    const table = useReactTable({
        data,
        columns: [], // we don’t render real columns
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: (row, columnId, filterValue) => {
            const task: Task = row.original;
            return (
                task.taskName
                    .toLowerCase()
                    .includes(filterValue.toLowerCase()) ||
                task.taskDetails
                    .toLowerCase()
                    .includes(filterValue.toLowerCase()) ||
                task.taskTags.some((tag) =>
                    tag.toLowerCase().includes(filterValue.toLowerCase()),
                )
            );
        },
    });

    const rows = table.getRowModel().rows;

    return (
        <div className="my-4 w-full rounded-lg border-2 border-gray-100 bg-white px-4 py-6 shadow-[0_2px_2px_rgba(0,0,0,0.15)]">
            {/* Controls */}
            <div className="mb-4 flex items-center justify-between gap-2">
                <Input
                    placeholder="Search tasks..."
                    value={globalFilter ?? ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="max-w-sm"
                />
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

            {/* Render tasks */}
            {viewMode === 'list' ? (
                <div>
                    {rows.map((row, index) => {
                        const task = row.original as Task;
                        return (
                            <div key={task.taskName}>
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
                                key={task.taskName}
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
