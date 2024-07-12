import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function Feedback() {
  const [selected, setSelected] = useState("");

  const handleThumbsClick = async (score: number) => {
    setSelected(score === 1 ? "up" : "down");
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "<user-id>",
          userScore: score,
          traceId: "<trace-id>",
          spanId: "<span-id>",
        }),
      });
    } catch (error: any) {
      console.log("error", error);
    } finally {
    }
  };

  return (
    <div className="flex">
      <div className="px-4">
        <button
          onClick={() => handleThumbsClick(1)}
          className={`${selected === "up" ? "text-black" : "text-gray-400"}`}
        >
          <ThumbsUp />
        </button>
      </div>
      <div className="px-4">
        <button
          onClick={() => handleThumbsClick(-1)}
          className={`${selected === "down" ? "text-black" : "text-gray-400 "}`}
        >
          <ThumbsDown />
        </button>
      </div>
    </div>
  );
}
