
export default function LoaderScreen({
    size = 70,
    fullscreen = false,
    tagline = "",
    includeResetStyles = false,
}) {
    return (
        <>
            <style>{`
        @font-face {
          font-family: 'LeckerliOne Regular';
          font-style: normal;
          font-weight: 300;
          src: url('/fonts/LeckerliOne-Regular.ttf') format('ttf');
          font-display: swap;
        }
      `}</style>

            {includeResetStyles && (
                <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body, #root { width: 100%; height: 100%; }
          body { background-color: #FFFFFF; }
        `}</style>
            )}

            <style>{`
        .loader-container-inline {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .loader-container-fullscreen {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: 'LeckerliOne Regular', sans-serif;
        }
        .logo {
          font-size: ${size}px;
          font-weight: 300;
          color: black;
          animation: gelatine 0.8s infinite;
          font-family: 'LeckerliOne Regular', sans-serif;
        }
        .tagline {
          margin-top: 12px;
          font-size: 18px;
          color: black;
          letter-spacing: 0.5px;
        }
        @keyframes gelatine {
          from, to { transform: scale(1, 1); }
          25% { transform: scale(0.9, 1.1); }
          50% { transform: scale(1.1, 0.9); }
          75% { transform: scale(0.95, 1.05); }
        }
      `}</style>

            <div
                data-nosnippet
                className={
                    fullscreen ? "loader-container-fullscreen" : "loader-container-inline"
                }
            >
                <div className="logo">m</div>
                {fullscreen && tagline && (
                    <div className="tagline font-text">{tagline}</div>
                )}
            </div>
        </>
    );
}