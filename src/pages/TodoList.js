import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import { getTodoApi, createTodoApi } from "../utils/api";

const TodoList = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("JWT");
    useEffect(() => {
        if (!token) {
            navigate("/signin");
        }
    }, [token]);

    const [data, setData] = useState([]);
    useEffect(() => {
        getTodoApi(token)
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data);
                } else {
                    throw new Error();
                }
            })
            .catch((err) => console.log(err));
    }, [token]);

    const [todoInputData, setTodoInputData] = useState("");
    const handleTodoInput = (e) => {
        setTodoInputData(e.target.value.trim());
    };
    const handleCreateTodo = () => {
        createTodoApi(token, todoInputData)
            .then((res) => {
                if (res.status === 201) {
                    setData((prev) => [...prev, res.data]);
                    setTodoInputData("");
                } else {
                    throw new Error();
                }
            })
            .catch((err) => console.log(err));
    };
    const onChangeListItem = (id) => {
        setData((prevData) => prevData.filter((el) => el.id !== id));
    };

    if (!token) return;

    return (
        <div>
            <Header />
            <div className="todolist">
                <div className="todoinput">
                    <input
                        data-testid="new-todo-input"
                        value={todoInputData}
                        onChange={handleTodoInput}
                    />
                    <button
                        data-testid="new-todo-add-button"
                        onClick={handleCreateTodo}
                    >
                        추가
                    </button>
                </div>
                {data?.map((elm) => (
                    <ListItem
                        key={elm.id}
                        data={elm.todo}
                        id={elm.id}
                        isCompleted={elm.isCompleted}
                        onChangeListItem={onChangeListItem}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
