import { cn } from "../../lib/utils";

const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className={cn(
        "lg:max-w-4xl mx-auto px-2 w-full flex flex-col justify-between items-center",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
