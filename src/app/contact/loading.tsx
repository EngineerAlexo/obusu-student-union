import { Container } from "@/components/shared/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 rounded-xl border p-4 lg:col-span-3">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="space-y-3 rounded-xl border p-4 lg:col-span-2">
            <Skeleton className="h-7 w-1/2" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
