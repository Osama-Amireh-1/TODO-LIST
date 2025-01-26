import { useEffect } from "react";
import { useState } from "react";
import deleteIcon from "./assets/delete.png";

function App() {
  const [item, setItem] = useState("");
  const [SelectedFillter,setSelectedFillter]=useState("all")
  const [originalTodoList, setOriginalTodoList] = useState(() => {
    const localValue = localStorage.getItem("ITEM");
    if (localValue == null) return [];
    else return JSON.parse(localValue);
  });
  const [todoList, SetTodoList] = useState(originalTodoList);

  useEffect(() => {
    localStorage.setItem("ITEM", JSON.stringify(originalTodoList));
  }, [originalTodoList]);

  const deleteTask = (id) => {
    const updatedList = originalTodoList.filter((todo) => todo.id !== id);

    setOriginalTodoList(updatedList);
ApplayFilter(updatedList,SelectedFillter)
    console.log(originalTodoList);
  };
  const addTodo = () => {
    const newTask = {
      id: crypto.randomUUID(),
      name: item,
      isPacked: false,
    };
    const updatedList = [...originalTodoList, newTask];
    setOriginalTodoList(updatedList);
    ApplayFilter(updatedList,SelectedFillter)
    setItem("");
    console.log(originalTodoList);
  };
  function toggleTodo(id, isPacked) {
    const updatedList = originalTodoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isPacked };
      }
      return todo;
    });
    setOriginalTodoList(updatedList);
    ApplayFilter(updatedList,SelectedFillter)
  }

  function UpdateView(event) {
   const fillter=event.target.value;
   setSelectedFillter(fillter);
   ApplayFilter(originalTodoList,fillter);
  }

  function ApplayFilter(List,filter)
  {
    if (filter == "Completed") {
      SetTodoList(List.filter((todo) => todo.isPacked === true));
    } else if (filter == "Incomplete") {
      SetTodoList(List.filter((todo) => todo.isPacked !== true));
    } else if (filter === "all") {
      SetTodoList(List);
    }
  }
  function addTodoOnClick(e)
  {
    if(e.key==='Enter')
      {
        const newTask = {
          id: crypto.randomUUID(),
          name: item,
          isPacked: false,
        };
        const updatedList = [...originalTodoList, newTask];
        setOriginalTodoList(updatedList);
        ApplayFilter(updatedList,SelectedFillter)
        setItem("");

      }
}
  return (
    <>
      <div className="Main">
        <div>
          <div className="Title">
            <h3>TODO LIST</h3>
          </div>
          <div className="AddTaskContainer">
            <div className="TaskInput">
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Write your task"
                onKeyDown={addTodoOnClick}
              />
              <button onClick={addTodo}>+</button>
            </div>
            <div className="dropdown">
              <select onChange={UpdateView}>
                <option value="all">All</option>
                <option value="Completed">Completed </option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>
          </div>
          <div className="ListContainer">
            <div className="Task">
              {todoList.map((task) => (
                <div key={task.id} className="tt">
                  <div>
                    <input
                      type="checkbox"
                      checked={task.isPacked}
                      onChange={(e) => toggleTodo(task.id, e.target.checked)}
                    />
                    {task.isPacked ? (
                      <span>
                        <del> {task.name}</del>
                      </span>
                    ) : (
                      <span>{task.name}</span>
                    )}
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      backgroundImage: `url(${deleteIcon})`
                    }}
                  ></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
