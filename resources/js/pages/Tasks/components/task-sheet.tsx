import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

type TaskSheetProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task?: {
        id: number;
        name: string;
        details: string;
        priority: string;
        space: string;
        due_date: string;
        tags: string[];
        status: 'ongoing' | 'completed';
    };
    mode?: 'create' | 'edit';
};

const TaskSheet = ({ setOpen, task, mode = 'create' }: TaskSheetProps) => {
    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: task?.name ?? '',
        details: task?.details ?? '',
        priority: task?.priority ?? '',
        space: task?.space ?? '',
        due_date: task?.due_date ?? '',
        tags: task?.tags ?? [],
        status: task?.status ?? '',
    });

    const [tagInput, setTagInput] = React.useState('');
    const [date, setDate] = React.useState<Date | undefined>(
        task?.due_date ? new Date(task.due_date) : undefined,
    );

    const handleAddTag = () => {
        if (tagInput.trim() !== '' && !data.tags.includes(tagInput.trim())) {
            setData('tags', [...data.tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setData(
            'tags',
            data.tags.filter((t) => t !== tag),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.name.trim()) {
            toast.error('Task name is required');
            return;
        }
        if (!data.priority) {
            toast.error('Task priority is required');
            return;
        }
        if (!data.space) {
            toast.error('Task space is required');
            return;
        }

        if (mode === 'create') {
            post('/tasks', {
                onSuccess: () => {
                    reset();
                    setDate(undefined);
                    setOpen(false);
                },
            });
        } else if (mode === 'edit' && task) {
            put(`/tasks/${task.id}`, {
                onSuccess: () => {
                    setOpen(false);
                },
            });
        }
    };

    return (
        <SheetContent className="overflow-y-auto">
            <form onSubmit={handleSubmit}>
                <SheetHeader>
                    <SheetTitle>
                        {mode === 'create' ? 'Add New Task' : 'Edit Task'}
                    </SheetTitle>
                    <SheetDescription>
                        {mode === 'create'
                            ? 'Fill in details to create a new task.'
                            : 'Update the task details below.'}
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-2">
                        <Label htmlFor="task-name">Task name</Label>
                        <Input
                            id="task-name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter task name..."
                            autoComplete="off"
                        />
                        {errors.name && (
                            <span className="text-sm text-red-500">
                                {errors.name}
                            </span>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="task-details">Task details</Label>
                        <Textarea
                            id="task-details"
                            value={data.details}
                            onChange={(e) => setData('details', e.target.value)}
                            placeholder="Enter task details..."
                        />
                        {errors.details && (
                            <span className="text-sm text-red-500">
                                {errors.details}
                            </span>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label>Task priority</Label>
                        <Select
                            value={data.priority}
                            onValueChange={(val) => setData('priority', val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.priority && (
                            <span className="text-sm text-red-500">
                                {errors.priority}
                            </span>
                        )}
                    </div>
                    {mode === 'edit' ? (
                        <div className="grid gap-2">
                            <Label>Task status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(val) => setData('status', val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ongoing">
                                        Ongoing
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <span className="text-sm text-red-500">
                                    {errors.status}
                                </span>
                            )}
                        </div>
                    ) : null}

                    <div className="grid gap-2">
                        <Label>Task space</Label>
                        <Select
                            value={data.space}
                            onValueChange={(val) => setData('space', val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select space" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="work">Work</SelectItem>
                                <SelectItem value="fitness">Fitness</SelectItem>
                                <SelectItem value="personal">
                                    Personal
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.space && (
                            <span className="text-sm text-red-500">
                                {errors.space}
                            </span>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label>Task due date</Label>
                        <DatePicker
                            value={date}
                            onChange={(newDate) => {
                                setDate(newDate);
                                setData(
                                    'due_date',
                                    newDate
                                        ? `${newDate.getFullYear()}-${(
                                              newDate.getMonth() + 1
                                          )
                                              .toString()
                                              .padStart(
                                                  2,
                                                  '0',
                                              )}-${newDate.getDate().toString().padStart(2, '0')}`
                                        : '',
                                );
                            }}
                        />
                        {errors.due_date && (
                            <span className="text-sm text-red-500">
                                {errors.due_date}
                            </span>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="task-tags">Task tags</Label>
                        <div className="flex gap-2">
                            <Input
                                id="task-tags"
                                placeholder="Enter a tag..."
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddTag();
                                    }
                                }}
                                autoComplete="off"
                            />
                            <Button
                                type="button"
                                onClick={handleAddTag}
                                className="hover:cursor-pointer"
                            >
                                Add
                            </Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {data.tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm"
                                >
                                    <span>{tag}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="text-gray-600 hover:text-red-500"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {errors.tags && (
                            <span className="text-sm text-red-500">
                                {errors.tags}
                            </span>
                        )}
                    </div>
                </div>
                <SheetFooter>
                    <Button
                        type="submit"
                        disabled={processing}
                        className="hover:cursor-pointer"
                    >
                        {processing
                            ? mode === 'create'
                                ? 'Creating...'
                                : 'Saving...'
                            : mode === 'create'
                              ? 'Create task'
                              : 'Save changes'}
                    </Button>
                    <SheetClose asChild>
                        <Button
                            variant="outline"
                            className="hover:cursor-pointer"
                        >
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </form>
        </SheetContent>
    );
};

export default TaskSheet;
