import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function LoadingSkeleton({ className, children }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-navy-deep/10 dark:bg-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BookCardSkeleton() {
  return (
    <div className="group relative flex flex-col gap-4">
      <div className="relative w-full aspect-[2/3]">
        <LoadingSkeleton className="w-full h-full rounded-sm shadow-book" />
      </div>
      <div className="flex flex-col gap-2 px-1">
        <LoadingSkeleton className="h-6 w-3/4" />
        <LoadingSkeleton className="h-4 w-1/2" />
        <div className="flex items-center justify-between mt-2">
          <LoadingSkeleton className="h-6 w-16 rounded" />
          <LoadingSkeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="w-full h-[500px] lg:h-[600px]">
          <LoadingSkeleton className="w-full h-full rounded-2xl" />
        </div>
        <div className="flex flex-col gap-8">
          <LoadingSkeleton className="h-4 w-1/3" />
          <LoadingSkeleton className="h-12 w-3/4" />
          <LoadingSkeleton className="h-20 w-full" />
          <div className="flex gap-4">
            <LoadingSkeleton className="h-14 flex-1 rounded-full" />
            <LoadingSkeleton className="h-14 flex-1 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
