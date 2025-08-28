'use client';

import React, { useEffect, useState } from 'react';

type Todo = {
	id: number;
	task: string;
	completed: boolean;
};

export default function Home() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTask, setNewTask] = useState('');

	useEffect(() => {
		fetch('/api/todos')
			.then((res) => res.json())
			.then(setTodos);
	}, []);

	const addTodo = async () => {
		if (!newTask.trim()) return;

		const res = await fetch('/api/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ task: newTask }),
		});
		const todo: Todo = await res.json();
		setTodos((prev) => [...prev, todo]);
		setNewTask('');
	};

	const toggleCompleted = async (todo: Todo) => {
		await fetch('/api/todos', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...todo, completed: !todo.completed }),
		});
		setTodos((prev) =>
			prev.map((t) =>
				t.id === todo.id ? { ...t, completed: !t.completed } : t
			)
		);
	};

	const deleteTodo = async (id: number) => {
		await fetch('/api/todos', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id }),
		});
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};

	return (
		<main className="max-w-xl mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">My To-Do List</h1>

			<div className="flex gap-2 mb-6">
				<input
					type="text"
					className="flex-grow border rounded px-3 py-2"
					placeholder="New task..."
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && addTodo()}
				/>
				<button
					onClick={addTodo}
					className="bg-blue-600 text-white px-4 py-2 rounded"
				>
					Add
				</button>
			</div>

			<ul>
				{todos.map((todo) => (
					<li
						key={todo.id}
						className="flex items-center justify-between mb-2"
					>
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								checked={todo.completed}
								onChange={() => toggleCompleted(todo)}
							/>
							<span
								className={`${todo.completed ? 'line-through text-gray-500' : ''
									}`}
							>
								{todo.task}
							</span>
						</label>
						<button
							onClick={() => deleteTodo(todo.id)}
							className="text-red-600 font-bold"
							aria-label="Delete todo"
						>
							&times;
						</button>
					</li>
				))}
			</ul>
		</main>
	);
}
