import React, {useState} from "react";
import {View, StyleSheet, TextInput, Button, Alert} from 'react-native'

export const AddToDo = ({onSubmit}) => {
    const [value, setValue] = useState('')

    const pressHendler = () =>{
        if(value.trim()){        
            onSubmit(value)
            setValue('')
        } else{
            Alert.alert('Input should not be empty!')
        }
    }
    return(
        <View style={styles.block}>
            <TextInput 
            style={styles.input}
            onChangeText={setValue}
            value={value}
            placeholder="Please input task..."
            autoCorrect={false}
            autoCapitalize="none"
            />
            <Button title='Add' onPress={pressHendler} />
        </View>
    )
}

const styles = StyleSheet.create({
    block:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginBottom: 15
    },
    input:{
        width: '70%',
        padding: 10,
        borderStyle:'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#3949ab'
    }
})