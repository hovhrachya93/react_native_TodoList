import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import TodoList from './TodoList';
import uuidv4 from 'uuidv4';

const Todo = () => {
  const [todoItems, setTodoItems] = useState(() => [
    {id: uuidv4(), title: 'task 1', isComplete: false},
    {id: uuidv4(), title: 'task 2', isComplete: false},
  ]);
  const [text, setText] = useState('');

  const changeText = text => setText(text);
  const addTodoItem = () => {
    if (text.length > 0) {
      setTodoItems([
        ...todoItems,
        {
          id: uuidv4(),
          title: text,
          isComplete: false,
        },
      ]);
    }
    setText('');
  };

  const completeTodoItem = id =>
    setTodoItems(
      todoItems.map(todoItem =>
        todoItem.id === id
          ? {...todoItem, isComplete: !todoItem.isComplete}
          : todoItem,
      ),
    );

  const removeTodoItem = id =>
    setTodoItems(todoItems.filter(todoItem => todoItem.id !== id));

  return (
    <>
      <TodoList
        todoItems={todoItems}
        completeTodoItem={completeTodoItem}
        removeTodoItem={removeTodoItem}
      />
      <TextInput
        style={styles.textInput}
        placeholder="add task..."
        value={text}
        onChangeText={changeText}
        onSubmitEditing={addTodoItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default Todo;
