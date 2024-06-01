import * as React from "react";
import { useState } from "react";
import "./index.css";

const IndexPage = () => {
  const [items, setItems] = useState([
    { id: 1, content: "First Check item", ifCheck: false },
  ]);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      content: `New check item`,
      ifCheck: false,
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id, newContent) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, content: newContent } : item
      )
    );
  };

  const toggleCheck = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, ifCheck: !item.ifCheck } : item
      )
    );
  };

  return (
    <main className="container">
      <h1>Check List</h1>
      <ul className="check-list">
        {items.map((item) => (
          <CheckItem
            key={item.id}
            id={item.id}
            content={item.content}
            ifCheck={item.ifCheck}
            onDelete={deleteItem}
            onUpdate={updateItem}
            onToggleCheck={toggleCheck}
          />
        ))}
      </ul>
      <button onClick={addItem}>Add new check item</button>
    </main>
  );
};

const CheckItem = ({
  id,
  content,
  ifCheck,
  onDelete,
  onUpdate,
  onToggleCheck,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(id, newContent);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewContent(content);
  };

  const handleCheckboxChange = () => {
    if (isEditing) {
      handleCancelClick();
    }
    onToggleCheck(id);
  };

  return (
    <li className={ifCheck ? "check-item checked" : "check-item"}>
      <input
        type="checkbox"
        checked={ifCheck}
        onChange={handleCheckboxChange}
      />
      {isEditing ? (
        <input
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="item-content"
        />
      ) : (
        <p className="item-content">{content}</p>
      )}
      {isEditing ? (
        <>
          <button className="btn" onClick={handleSaveClick}>
            Save
          </button>
          <button className="btn" onClick={handleCancelClick}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <button className="btn" onClick={handleEditClick}>
            Edit
          </button>
          <button className="btn" onClick={() => onDelete(id)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default IndexPage;

export const Head = () => <title>Check list</title>;
