export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="chat-layout">
      <style>{`
        .chat-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          min-height: 100dvh;
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
