export function VideoPlayer({ url }: { url: string }): JSX.Element {
  return (
    <div className="aspect-h-9 aspect-w-16">
      <iframe
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
        allowFullScreen
        title="video player"
      />
    </div>
  );
}
