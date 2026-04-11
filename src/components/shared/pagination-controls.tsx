import { Button } from "@/components/ui/button";

type PaginationControlsProps = {
  page: number;
  pageCount: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function PaginationControls({
  page,
  pageCount,
  onPrevious,
  onNext,
}: PaginationControlsProps) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="text-xs text-muted-foreground">
        Page {page} of {pageCount}
      </p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onPrevious} disabled={page <= 1}>
          Previous
        </Button>
        <Button size="sm" variant="outline" onClick={onNext} disabled={page >= pageCount}>
          Next
        </Button>
      </div>
    </div>
  );
}
