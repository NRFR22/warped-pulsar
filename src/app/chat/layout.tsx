export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="chat-layout">
      <style>{`
        html, body {
          overflow-x: hidden !important;
          max-width: 100vw !important;
        }
        .chat-layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
          height: 100dvh;
          width: 100%;
          max-width: 100vw;
          overflow: hidden;
        }
        /* Hide navbar and footer on chat page */
        body > header,
        body > footer {
          display: none !important;
        }
      `}</style>
      {children}
    </div>
  );
}
