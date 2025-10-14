import { userStore } from "@/stores/user.store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  const user = userStore((state) => state.user);

  return (
    <nav className="bg-background fixed top-0 left-0 right-0 border-b border-border">
      <div className="w-full max-w-screen-lg mx-auto p-2 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* <figure className="mr-6">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance select-none">
              TS
            </h1>
          </figure> */}
          <Button variant="linkWithSecondary" asChild>
            <Link to="/tasks">Tarefas</Link>
          </Button>
          <Button variant="linkWithSecondary" asChild>
            <Link to="/">Usuários</Link>
          </Button>
        </div>
        <div>
          {user && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="outline-none cursor-pointer">
                  <Avatar className="size-10">
                    <AvatarImage
                      src={`https://avatar.iran.liara.run/username?username=${encodeURIComponent(user.username)}`}
                    />
                    <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={8} side="bottom" align="end">
                <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Meus dados</DropdownMenuItem>
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};
