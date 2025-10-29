import React, { useEffect, useRef, useCallback } from "react";

interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  children: React.ReactNode;
}

export default function InfiniteScrollWrapper({
  loadMore,
  hasMore,
  loading,
  children,
}: InfiniteScrollProps) {
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        loadMore();
      }
    },
    [loadMore, hasMore, loading]
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    if (sentinelRef.current) observer.current.observe(sentinelRef.current);
    return () => observer.current?.disconnect();
  }, [handleObserver]);

  return (
    <div>
      {children}
      <div ref={sentinelRef} className="h-10" />
      {loading && <p className="text-center py-4 text-gray-500">Loading...</p>}
    </div>
  );
}
