import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <form>
        <label>Upload a file</label>
        <input type='file' />
        <input type='text' placeholder='Enter you name' />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
}

export default App;
