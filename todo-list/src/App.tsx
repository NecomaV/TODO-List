import React, {FC, ChangeEvent, useState} from 'react';
import './App.css';
import { eventNames } from 'process';
import {ITask} from './Interfaces'
import TodoTask from './components/TodoTask';

const App: FC = () => {


  const [task, setTask] = useState<string>("");
  const [deadLine, setDeadine] = useState<number>(0);

  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if( event.target.name === 'task'){
      setTask(event.target.value);
    }
    else {
      setDeadine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    if(task === ''){
      return alert('Enter the Deadline for Your Task')
    }
    else if(deadLine === 0){
      return alert('DeadLine cannot be 0')
    }
    else{
      const newTask = { taskName: task, deadline: deadLine };
      setTodoList([...todoList, newTask]);
      setTask("");
      setDeadine(0);
    }
    
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName != taskNameToDelete
    }))
  }


  return (
    <div className="App">

      <div className="header">
        
        <div className="inputContainer">

          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadLine}
            onChange={handleChange}
          />

        </div>

        <button onClick={addTask}>Add Task</button>

      </div>

      <div className="todoList">

        {todoList.map((task: ITask, key: number) => {

          return <TodoTask key={key} task={task} completeTask={completeTask}/>;

        })}

      </div>

    </div>
  );
}

export default App;
