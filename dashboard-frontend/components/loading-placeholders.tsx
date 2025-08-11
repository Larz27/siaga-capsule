export function StatisticsCardsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-card p-6 rounded-lg border">
          <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
          <div className="h-8 bg-muted rounded animate-pulse mb-1"></div>
          <div className="h-3 bg-muted rounded animate-pulse w-20"></div>
        </div>
      ))}
    </div>
  );
}

export function ChartLoading() {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <div className="h-6 bg-muted rounded animate-pulse mb-4 w-40"></div>
      <div className="h-64 bg-muted rounded animate-pulse"></div>
    </div>
  );
}

export function TableLoading() {
  return (
    <div className="bg-card rounded-lg border">
      <div className="p-6">
        <div className="h-6 bg-muted rounded animate-pulse mb-4 w-32"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="h-4 bg-muted/60 rounded animate-pulse"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}