import { BottleSkeleton } from "@/components/three/BottleSkeleton";

type Variant = "home" | "products" | "contact";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={
        "relative overflow-hidden rounded-2xl bg-soft animate-skeleton-pulse " +
        (className ?? "")
      }
    >
      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-skeleton-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
}

export function PageSkeleton({ variant }: { variant: Variant }) {
  return (
    <section className="relative isolate min-h-screen px-5 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-32 md:pb-32 md:pt-40 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dotgrid bg-dotgrid-fade opacity-40" />

      <div className="mx-auto max-w-7xl">
        {/* Eyebrow */}
        <Shimmer className="h-7 w-44" />
        {/* Title */}
        <Shimmer className="mt-5 h-16 w-[80%] md:h-24 md:w-[60%]" />
        {/* Subline */}
        <Shimmer className="mt-4 h-5 w-[55%]" />

        {variant === "products" ? (
          <>
            {/* Featured 3D centerpiece */}
            <div className="card-soft-lg mt-16 grid grid-cols-1 overflow-hidden rounded-3xl bg-soft md:grid-cols-2">
              <div className="relative h-[360px] sm:h-[420px] md:h-[520px]">
                <BottleSkeleton variant="apothecary" />
              </div>
              <div className="space-y-4 p-10 md:p-14">
                <Shimmer className="h-4 w-32" />
                <Shimmer className="h-12 w-3/4" />
                <Shimmer className="h-4 w-full" />
                <Shimmer className="h-4 w-5/6" />
                <div className="flex gap-3 pt-4">
                  <Shimmer className="h-12 w-40 rounded-full" />
                  <Shimmer className="h-12 w-32 rounded-full" />
                </div>
              </div>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} variant={
                  i % 3 === 0 ? "apothecary" : i % 3 === 1 ? "syrup" : "dropper"
                } />
              ))}
            </div>
          </>
        ) : null}

        {variant === "contact" ? (
          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-7">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Shimmer key={i} className="h-16" />
                ))}
              </div>
              <Shimmer className="h-40" />
              <div className="flex items-center justify-end">
                <Shimmer className="h-14 w-48 rounded-full" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <Shimmer className="h-72 rounded-3xl" />
            </div>
          </div>
        ) : null}

        {variant === "home" ? (
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            <Shimmer className="aspect-[16/9]" />
            <div className="space-y-4">
              <Shimmer className="h-10 w-3/4" />
              <Shimmer className="h-4" />
              <Shimmer className="h-4 w-5/6" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProductCardSkeleton({
  variant,
}: {
  variant: "apothecary" | "syrup" | "dropper";
}) {
  return (
    <div className="card-soft overflow-hidden rounded-3xl">
      <div className="relative h-[260px] bg-soft xs:h-[280px] sm:h-[300px]">
        <BottleSkeleton variant={variant} />
      </div>
      <div className="space-y-3 p-7">
        <Shimmer className="h-3 w-28" />
        <Shimmer className="h-6 w-3/4" />
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-5/6" />
        <div className="flex items-center justify-between pt-3">
          <Shimmer className="h-3 w-24" />
          <Shimmer className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}
