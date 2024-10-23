import { TodoList } from "@/scenes/TodoList";
// import { TodoListWithLogic } from "@/scenes/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex">
      <div className="w-full p-4">
        <TodoList />
        {/* <TodoListWithLogic /> */}
      </div>
    </div>
  );
}
