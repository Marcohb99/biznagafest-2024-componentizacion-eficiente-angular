// import { TodoListWithHook } from "@/scenes/TodoList/TodoListWithHook";
// import { TodoListWithLogic } from "@/scenes/TodoList/TodoListWithLogic";
// import { TodoListWithHandling } from "@/scenes/TodoList/TodoListWithHandling";
import { TodoListWithComposition } from "@/scenes/TodoList/TodoListWithComposition";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex">
      <div className="w-full p-4">
        {/* <TodoListWithHook /> */}
        {/* <TodoListWithLogic /> */}
        {/* <TodoListWithHandling /> */}
        <TodoListWithComposition />
      </div>
    </div>
  );
}
