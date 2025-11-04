import { cn } from "../../lib/utils";

const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div className={cn("max-w-4xl mx-auto px-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Container;
