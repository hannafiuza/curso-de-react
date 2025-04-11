import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import logo from "./image/logo.png";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (tasks.length === 0) {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=0",
          {
            method: "GET",
          }
        );

        //PEGAR OS DADOS QUE ELA RETORNA
        const data = await response.json();

        // Armazena as tarefas obtidas no estado e no localStorage
        setTasks(data);
      }
    };
    fetchTasks();
  }, [tasks.length]); // Dependência para evitar loops infinitos

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      // NAO PRECISO ATUALIZAR ESSA TAREFA
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }
  // Função para limpar todas as tarefas
  function clearTasks() {
    setTasks([]); // Limpa o estado das tarefas
    localStorage.removeItem("tasks"); // Remove as tarefas do localStorage
  }

  return (
    <div className="w-screen h-screen bg-pink-100 flex justify-center p-6 overflow-y-auto">
      <div className="w-[500px] space-y-4 bg-pink-100 p-6">
        <img src={logo} alt="logo" className="mx-auto mb-4" />
        <h1 className="text-3xl text-pink-500 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
        <button
          onClick={clearTasks}
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          Limpar Tarefas
        </button>
      </div>
    </div>
  );
}

export default App;
