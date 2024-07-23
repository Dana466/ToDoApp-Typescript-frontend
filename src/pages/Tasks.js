import React,{useEffect, useState} from 'react'
import ToDocomp from '../components/todocomp';
import './tasks.css';
import { addToDo, getallToDo, updateTodo,deleteTodo} from '../utils/handletasks';
import { FaEyeSlash } from 'react-icons/fa';
//import '../index.css'
import { FaEye} from 'react-icons/fa'
import { createContext } from 'react'
import { Header } from '../components/pageHeader';


export const ThemeContext =createContext(null)

const TaskstoDo = () => {

const [toDo,setToDo]=useState([])

const [text,setText] =useState("")

const [hideCompleted, setHideCompleted] = useState(false);

const [theme,setTheme] =useState("dark")

const toggletheme =() =>{
setTheme((curr) =>(curr === "light" ? "dark" : "light"))

}


useEffect(() =>{
    
getallToDo(setToDo)

},[])

  return (
    <ThemeContext.Provider value={{theme,toggletheme}}>
    <div className="container" id ={theme}>
           <Header toggleTheme={toggletheme}/>
            <hr/>

            <div className='task-header font-primary size-4 '>
        {!hideCompleted && <span className={'completed-count font-primary '}>{toDo.filter(item => item.completed).length} Completed</span>}
        <button className="hide-completed" onClick={() => setHideCompleted(!hideCompleted)}>
          {!hideCompleted ? <FaEyeSlash width={24} height={24}/> : <FaEye className='eye w-6 h-screen flex justify-center items-center  ' />} {hideCompleted ? 'Unhide' : 'Hide'} Completed 
        </button>
      </div>
 
                <div className="task-list w-1080 h-380" id="listcheckbox">
                    <ul>
                    {toDo.map((item) => (!hideCompleted || !item.completed) && (
                    <ToDocomp
                     key={item._id} 
                     text={item.text} 
                     completed={item.completed}
                     update={() =>updateTodo(item._id,setToDo)}
                     deleteDo ={() => deleteTodo(item._id,setToDo)}
                     
                     /> )
                     )}

                    </ul>
                </div>
                
                <div className="add-note w-1120 h-24">
                    <input type="text" placeholder="New Note" value={text} onChange={(e) => setText(e.target.value)} />

                    <button className="addbtn " onClick={() => addToDo(text,setText,setToDo)} >
                        <p className='nt font-primary '> Add New Note </p></button>
                </div>
            
        </div>
        </ThemeContext.Provider>

  )
}

export default TaskstoDo

