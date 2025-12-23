export default function SongSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-40 bg-muted rounded-md" />
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-1/2" />
    </div>
  );
}
