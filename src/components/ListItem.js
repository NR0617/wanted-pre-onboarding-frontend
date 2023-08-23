import { useState, useEffect } from "react";
import { deleteTodoApi, updateTodoApi } from "../utils/api";

const ListItem = ({ data, id, isCompleted, deleteListItem }) => {
  const [isModified, setIsModified] = useState(false);
  const handleModify = () => {
    setIsModified((prev) => !prev);
  };

  const [modifyInputData, setModifyInputData] = useState(data);
  const handleModifyInputData = (e) => {
    setModifyInputData(e.target.value.trim());
  };

  const token = localStorage.getItem("JWT");

  const handleDeleteTodo = () => {
    deleteTodoApi(token, id)
      .then((res) => {
        if (res.status === 204) {
          deleteListItem(id);
        } else {
          throw new Error();
        }
      })
      .catch((err) => console.log(err));
  };
  const [isChecked, setIsChecked] = useState(isCompleted);
  const handleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  const [listData, setListData] = useState(data);
  const handleUpdateTodo = () => {
    updateTodoApi(token, modifyInputData, id, isChecked)
      .then((res) => {
        if (res.status === 200) {
          setListData(res.data.todo);
          setIsModified(false);
        } else {
          throw new Error();
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    updateTodoApi(token, modifyInputData, id, isChecked)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error();
        }
      })
      .catch((err) => console.log(err));
  }, [isChecked]);

  return (
    <div className="todolist-item">
      <li>
        <label style={{ display: "flex" }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckbox}
          />
          {!isModified ? (
            <p>{listData}</p>
          ) : (
            <input
              data-testid="modify-input"
              value={modifyInputData}
              onChange={handleModifyInputData}
            />
          )}
        </label>
      </li>
      {!isModified ? (
        <div>
          <button data-testid="modify-button" onClick={handleModify}>
            수정
          </button>
          <button data-testid="delete-button" onClick={handleDeleteTodo}>
            삭제
          </button>
        </div>
      ) : (
        <div>
          <button data-testid="submit-button" onClick={handleUpdateTodo}>
            제출
          </button>
          <button data-testid="cancel-button" onClick={handleModify}>
            취소
          </button>
        </div>
      )}
    </div>
  );
};

export default ListItem;
