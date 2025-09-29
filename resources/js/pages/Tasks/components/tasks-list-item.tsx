import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CircleSmall, Pencil, Trash2 } from 'lucide-react';
import * as React from 'react';
import { route } from 'ziggy-js';

import TaskSheet from './task-sheet';

type Props = {
    task: {
        id: number;
        name: string;
        details: string;
        priority: string;
        space: string;
        due_date: string;
        tags: string[];
        status: 'ongoing' | 'completed';
    };
    onDelete?: (taskId: number, closeModal: () => void) => void;
};

const textColorMap: Record<string, string> = {
    high: 'text-[var(--red-1)]',
    medium: 'text-[var(--yellow-3)]',
    low: 'text-[var(--green-4)]',
};

const bgColorMap: Record<string, string> = {
    high: 'bg-[var(--red-2)]',
    medium: 'bg-[var(--yellow-4)]',
    low: 'bg-[var(--green-6)]',
};

const getTextColor = (priority: string): string => textColorMap[priority];
const getBackgroundColor = (priority: string): string => bgColorMap[priority];

const TasksListItem = ({ task, onDelete }: Props) => {
    const { patch } = useForm();
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const handleDelete = () => {
        if (onDelete) onDelete(task.id, () => setIsSheetOpen(false));
    };

    const toggleStatus = () => {
        console.log(
            'Generated URL:',
            route('tasks.toggle-status', { task: task.id }),
        );
        patch(route('tasks.toggle-status', { task: task.id }));
    };

    return (
        <div className="flex items-center justify-start gap-4">
            <div className="flex-1 space-y-2">
                <p
                    className={`text-lg font-semibold text-gray-800 ${
                        task.status === 'completed' ? 'line-through' : ''
                    }`}
                >
                    {task.name}
                </p>
                <p className="text-sm text-gray-600">{task.details}</p>
                <div className="flex items-center justify-start gap-4">
                    <p
                        className={`text-xs ${getTextColor(task.priority)} ${getBackgroundColor(task.priority)} rounded-2xl px-3 py-1 font-semibold`}
                    >
                        {task.priority}
                    </p>
                    <div className="flex items-center justify-start gap-1">
                        <CircleSmall className="h-2 w-2 rounded-full bg-[var(--purple-3)] text-[var(--purple-3)]" />
                        <p className="text-sm text-gray-500 capitalize">
                            {task.space}
                        </p>
                    </div>
                    {task.due_date && (
                        <p className="text-sm text-gray-500">
                            Due: {format(new Date(task.due_date), 'dd-MM-yyyy')}
                        </p>
                    )}
                </div>
                <div className="flex flex-wrap items-center justify-start gap-1">
                    {task.tags &&
                        task.tags.map((tag, index) => (
                            <div
                                key={index}
                                className="w-max rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-800"
                            >
                                #{tag}
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex items-center justify-center gap-4 self-start">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Pencil className="h-4 w-4 text-gray-500 hover:cursor-pointer hover:text-[var(--blue-2)]" />
                    </SheetTrigger>
                    <TaskSheet
                        setOpen={setIsSheetOpen}
                        task={task}
                        mode="edit"
                    />
                </Sheet>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Trash2 className="h-4 w-4 text-gray-500 transition duration-200 hover:cursor-pointer hover:text-[var(--red-1)]" />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Task</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete{' '}
                                <b>{task.name}</b>? This action cannot be
                                undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                className="hover:cursor-pointer"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                className="hover:cursor-pointer"
                            >
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default TasksListItem;
