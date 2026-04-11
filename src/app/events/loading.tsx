import { Container } from "@/components/shared/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventsLoading() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="space-y-3 rounded-xl border p-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
