import List from "./list";
import { NewButton } from "./new-button";

export default function Sidebar() {
  return (
    <aside className="fixed text-white x-10 left-0 bg-blue-950 h-full w-[3.75rem] flex p-3 flex-col gap-y-4">
      <List />
      <NewButton />
    </aside>
  );
}
