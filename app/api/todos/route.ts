import { NextResponse } from 'next/server';

type Todo = {
	id: number;
	task: string;
	completed: boolean;
};

let todos: Todo[] = [
	{ id: 1, task: 'TEST', completed: false },
];

export async function GET() {
	return NextResponse.json(todos);
}

export async function POST(req: Request) {
	const { task } = await req.json();
	const newTodo: Todo = {
		id: Date.now(),
		task,
		completed: false,
	};
	todos.push(newTodo);
	return NextResponse.json(newTodo);
}

export async function PUT(req: Request) {
	const { id, task, completed } = await req.json();
	todos = todos.map((todo) =>
		todo.id === id ? { ...todo, task, completed } : todo
	);
	return NextResponse.json({ message: 'Todo updated' });
}

export async function DELETE(req: Request) {
	const { id } = await req.json();
	todos = todos.filter((todo) => todo.id !== id);
	return NextResponse.json({ message: 'Todo deleted' });
}
