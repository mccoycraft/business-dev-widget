import ReactMarkdown from 'react-markdown';
import guideContent from './guide.md?raw'; // Vite raw import

export default function GuideModal({ show, onClose }) {
    if (!show) return null;

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(15, 23, 42, 0.98)",
            zIndex: 1000,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
        }}>
            {/* Header Bar */}
            <div style={{
                padding: "20px 30px",
                borderBottom: "1px solid #60CDFF",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#1e2937",
            }}>
                <h2 style={{ margin: 0, color: "#F5F5F5" }}>📘 Break-Even Analysis Detailed Guide</h2>
                <button
                    onClick={onClose}
                    style={{
                        background: "none",
                        border: "none",
                        color: "#60CDFF",
                        fontSize: "32px",
                        cursor: "pointer",
                        padding: "0 10px"
                    }}
                >
                    ✕
                </button>
            </div>

            {/* Full Content Area */}
            <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "40px 60px",
                lineHeight: "1.85",
                fontSize: "17px",
                color: "#F1F5F9",
            }}>
                <ReactMarkdown>{guideContent}</ReactMarkdown>
            </div>

            {/* Footer Bar */}
            <div style={{
                padding: "20px 30px",
                borderTop: "1px solid #334155",
                textAlign: "center",
                background: "#1e2937",
            }}>
                <button
                    onClick={onClose}
                    style={{
                        padding: "14px 40px",
                        background: "#60CDFF",
                        color: "#0f172a",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontSize: "17px",
                        cursor: "pointer"
                    }}
                >
                    Close Guide
                </button>
            </div>
        </div>
    );
}