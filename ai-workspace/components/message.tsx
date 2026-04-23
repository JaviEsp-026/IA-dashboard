type props = {
  content: string;
  role: "user" | "assistant";
}

export default function Message({ content, role }: props) {
  return (
    <div style={{
      textAlign: role === "user" ? "right" : "left",
      margin: "10px 0"
    }}>
      <span
        style={{
          background: role === "user" ? "#007bff" : "#eee",
          color: role === "user" ? "white" : "black",
          padding: "8px",
          borderRadius: "8px"
        }}
      >
        {content}
      </span>

    </div>
  );
}