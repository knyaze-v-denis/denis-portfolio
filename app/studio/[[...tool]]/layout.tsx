export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        .sanity-studio-root svg {
          display: inline-block;
          max-width: none;
        }

        .sanity-studio-root img {
          display: inline-block;
          max-width: none;
        }

        .sanity-studio-root button,
        .sanity-studio-root input,
        .sanity-studio-root textarea,
        .sanity-studio-root select {
          font: inherit;
        }
      `}</style>

      <div className="sanity-studio-root">{children}</div>
    </>
  );
}