import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todstring=localStorage.getItem("todos")
    if(todstring){

      let tods=JSON.parse(localStorage.getItem("todos"))
      settodos(tods)
    }
  }, [])

  const togglefinished = (e) => {
    setshowfinished(!showfinished)
  }
  
  

  const  handleedit = (e,id)=>{
    let t=todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!==id
    })
    settodos(newtodos)
    savetols()
  }
  const  handledelete = (e,id)=>{
    let newtodos=todos.filter(item=>{
      return item.id!==id
    })
    settodos(newtodos)
    savetols()
  }
  const  handleadd = ()=>{
    {}
    settodos([...todos, {id:uuidv4() ,todo, isCompleted:false}])
    settodo("")
    savetols()
  }
  const  handlechange = (e)=>{
    settodo(e.target.value)
  }

  const handlecheckbox = (e)=>{
    let id=e.target.name
    let index=todos.findIndex(item=>{
      return item.id===id
    })
    let newtodos=[...todos]
    newtodos[index].isCompleted=!newtodos[index].isCompleted
    settodos(newtodos);
    savetols()
  }

  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  


  return (
    <>
    <Navbar/>
      <div className="md:container rounded-xl mx-3 my-5 md:mx-auto bg-violet-100 p-5 min-h-[60vh] md:w-1/2 w-full">
      <h1 className='font-bold md:text-center '>iTask - Manage all your Todos at one place</h1>
        <div className="addTodo">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex">

          <input type="text" onChange={handlechange} value={todo} className='bg-white w-full px-5 rounded-lg'/>
          <button onClick={handleadd} disabled={todo.length<3} className='bg-violet-800  disabled:bg-violet-950 mx-3 py-1 text-sm font-bold hover:bg-violet-900 cursor-pointer text-white rounded-md w-1/4'>Add</button>
        </div>
          </div>
        <input type="checkbox" onChange={togglefinished} checked={showfinished} className='my-5'/> Show finished
       <h2 className='text-lg font-bold'>Your Todos</h2> 
       <div className="Todos">
        {todos.map(item=>{

        return (showfinished || !item.isCompleted)&& <div key={item.id} className="todo flex w-1/2 justify-between my-4">
          <div className='flex gap-5 w-full'>

          <input  type="checkbox" onChange={handlecheckbox} value={item.isCompleted} name={item.id}/>
          <div
  className={`w-full text-lg md:whitespace-normal ${
    item.isCompleted ? "line-through text-gray-400" : ""
  }`}
>

            {item.todo}
          </div>
          </div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>handleedit(e,item.id)} className='bg-violet-800 mx-1 p-3 py-1 text-sm font-bold hover:bg-violet-900 cursor-pointer text-white rounded-md'><FaRegEdit /></button>
            <button onClick={(e)=>handledelete(e,item.id)} className='bg-violet-800 mx-1 p-3 py-1 text-sm font-bold hover:bg-violet-900 cursor-pointer text-white rounded-md'><MdDelete /></button>
          </div>

        </div>
        })}
       </div>
      </div>
    </>
  )
}

export default App
