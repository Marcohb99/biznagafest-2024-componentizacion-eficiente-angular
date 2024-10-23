// import { TodoList } from "@/scenes/TodoList/TodoList";
// import { TodoListWithLogic } from "@/scenes/TodoList/TodoListWithLogic";
import { TodoListWithHandling } from "@/scenes/TodoList/TodoListWithHandling";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex">
      <div className="w-full p-4">
        {/* <TodoList /> */}
        {/* <TodoListWithLogic /> */}
        <TodoListWithHandling />
      </div>
    </div>
  );
}
