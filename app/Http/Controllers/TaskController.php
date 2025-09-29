<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use Carbon\Carbon;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::latest()->get();

        $now = Carbon::now();

        $totalTasks = Task::count();

        $completedTasks = Task::where('status', 'completed')->count();

        $ongoingTasks = Task::where('status', 'ongoing')->count();

        $pastDueTasks = Task::whereNotNull('due_date')
            ->where('due_date', '<', $now)
            ->where('status', '!=', 'completed')
            ->count();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'stats' => [
                'total'     => $totalTasks,
                'completed' => $completedTasks,
                'ongoing'   => $ongoingTasks,
                'past_due'  => $pastDueTasks,
            ],
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'details' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'space' => 'required|in:work,fitness,personal',
            'due_date' => 'nullable|date',
            'tags' => 'array',
            'tags.*' => 'string|max:50',
        ]);

        Task::create($validated);

        return redirect()->back()->with('success', 'Task created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return back()->with('error', 'Task not found.');
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'details' => 'nullable|string',
                'priority' => 'required|in:low,medium,high',
                'status' => 'required|in:ongoing,completed',
                'space' => 'required|in:work,fitness,personal',
                'due_date' => 'nullable|date',
                'tags' => 'array',
                'tags.*' => 'string|max:50',
            ]);

            $task->update($validated);

            return back()->with('success', 'Task updated successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'An unexpected error occurred while updating the task.');
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return back()->with('error', 'Task not found.');
            }

            $task->delete();

            return back()->with('success', 'Task deleted successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete task.');
        }
    }

}
