import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />k
      </div>
  );
}