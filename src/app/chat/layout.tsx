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
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        /* Only hide navbar and footer on MOBILE */
        @media (max-width: 600px) {
          body > header,
          body > footer {
            display: none !important;
          }
          .chat-layout {
            height: 100vh;
            height: 100dvh;
            overflow: hidden;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
