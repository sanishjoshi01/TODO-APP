import Header from "./Header";
import ToDoList from "./pages/ToDoList";
import CompletedTasks from "./pages/CompletedTasks";
import ModalPage from "./pages/ModalPage";

function App() {
  return (
    <>
      <Header />
      <ModalPage />
      <div className="mx-40">
        <div className="flex items-start justify-between text-center mb-10">
          <div className="w-[500px] border-2 p-4">
            <ToDoList />
          </div>
          <div className="w-[500px] border-2 p-4">
            <CompletedTasks />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
