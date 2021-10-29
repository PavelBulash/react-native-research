import { StatusBar } from 'expo-status-bar';
import React, {useCallback, useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AddToDo } from './src/AddTodo';
import { useHttp } from './src/hooks/http.hook';
import { Navbar } from './src/Navbar';
import { Todo } from './src/Todo';

export default function App() {
  const isCancelled = React.useRef(null);
  const [todos, setTodos] = useState([])
  const {loading, request} = useHttp()


  const initData = useCallback(async () => {
    try {
      const response = await request('https://reactnative.dev/movies.json', 'GET', null, null)
      if (!isCancelled.current) {
        setTodos(response.movies.map( item => ({id: item.id, title: item.title})))
      }
    } catch (error) {
      console.error(error);
    }
  }, [request])

  useEffect(() => {
    isCancelled.current = false;
      initData()    
      return () => {
        isCancelled.current = true;
      };
  }, [])

  const addTodo = (title) => {    
    setTodos(prev => [...prev,{
      id: Date.now().toString(),
      title
    }])
    
  }

  const removeTodo = id => {
    setTodos(prev => prev.filter(item => item.id !== id))
  }


  if (loading) {
    return null;
  }

  return (
    <View>
      <Navbar title='Todo App!'/>
      <View style={styles.container}>
        <AddToDo onSubmit={addTodo} />
        <FlatList 
          keyExtractor={(item)=> item.id.toString()}
          data={todos}
          renderItem={({item}) => (<Todo todo={item} onRemove={removeTodo} />)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {   
    paddingHorizontal: 30,
    paddingVertical: 20 
  }
});
