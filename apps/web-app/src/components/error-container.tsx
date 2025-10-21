import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

export const ErrorContainer = ({ message }: { message?: string }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="w-full flex items-center justify-center flex-col py-12 text-center">
      <h1 className="text-4xl font-extrabold">Oopppps...</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Aparentemente ocorreu um erro ao tentar carregar esse recurso.
      </p>
      {message && (
        <p className="text-sm text-muted-foreground">
          Mensagem: <strong className="text-foreground">{message}</strong>
        </p>
      )}
      <Button className="mt-4" variant="secondary" onClick={handleReload}>
        Recarregar <RefreshCcw />
      </Button>
    </div>
  );
};
