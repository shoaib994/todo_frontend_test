import { Route, Routes } from "react-router-dom";
import "./App.css";
import Todo from './component/Todo'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Todo/>} />
      
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      {/* <Home /> */}
    </div>
  );
}

export default App;
