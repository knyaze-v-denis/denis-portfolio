import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className,
}: ContainerProps) {
  return <div className={cn("content-container", className)}>{children}</div>;
}