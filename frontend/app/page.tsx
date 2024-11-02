// page.tsx
"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';

interface Todo {
    id: number;
    message: string;
}

export default function HomePage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");

    // タスク一覧を取得
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:8080/api/todos');
        setTodos(response.data);
    };

    // タスクを追加
    const addTodo = async () => {
        if (!newTodo) return;
        const response = await axios.post('http://localhost:8080/api/todos', { message: newTodo });
        setTodos([...todos, response.data]);
        setNewTodo("");
    };

    // タスクを削除
    const deleteTodo = async (id: number) => {
        await axios.delete(`http://localhost:8080/api/todos/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <h2>Todo List</h2>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New task"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.message}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
