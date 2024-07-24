import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function Evals({
  userId,
  traceId,
  spanId,
}: {
  userId: string;
  traceId: string;
  spanId: string;
}) {
  const [selected, setSelected] = useState("");

  const handleThumbsClick = async (score: number) => {
    setSelected(score === 1 ? "up" : "down");
    console.log("click", traceId, spanId);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          userScore: score,
          traceId: traceId,
          spanId: spanId,
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
