"use client";

import Evals from "@/components/shared/evals";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface Meal {
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
  rating: string;
  image: File;
  name: string;
  type: string;
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mealsData, setMealsData] = useState<Meal[]>([]);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [traceId, setTraceId] = useState<string>("");
  const [spanId, setSpanId] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        const meal = JSON.parse(data.response);
        const mealData: Meal = {
          calories: meal.Calories,
          carbs: meal.Carbs,
          protein: meal.Proteins,
          fats: meal.Fats,
          rating: meal["Health Score"],
          image: selectedFile,
          name: meal.Name,
          type: meal.Type,
        };
        setMealsData([...mealsData, mealData]);
        setTraceId(data.traceId);
        setSpanId(data.spanId);
        setUploadedFile(data.fileUrl);
        setUploadError(null);
      } catch (error: any) {
        console.log("error", error);
        setUploadError(error.message);
      }
    } else {
      setUploadError("No file selected");
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center flex-col">
      <h1>NutriPal</h1>
      <p>Upload your meal!</p>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          required
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          Select Image
        </label>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload Meal
        </button>
      </form>
      <div className="flex w-full mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meal</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead>Protein</TableHead>
              <TableHead>Fats</TableHead>
              <TableHead>Carbs</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Evals</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mealsData.map((meal: any, i: number) => (
              <MealRow key={i} meal={meal} traceId={traceId} spanId={spanId} />
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

function MealRow({
  meal,
  traceId,
  spanId,
}: {
  meal: Meal;
  traceId: string;
  spanId: string;
}) {
  const createImageSrc = (file: File) => {
    if (file && file instanceof File) {
      return URL.createObjectURL(file);
    }
    return ""; // Default return if no file or not a File object
  };

  const healthScore = (rating: string) => {
    if (rating === "1") {
      return "😞";
    } else if (rating === "2") {
      return "😐";
    } else if (rating === "3") {
      return "🙂";
    } else if (rating === "4") {
      return "😀";
    } else if (rating === "5") {
      return "😃";
    }
    return "🤔";
  };

  return (
    <TableRow className="border-b last:border-b-0">
      <TableCell>
        <img src={createImageSrc(meal.image)} className="w-24 mx-auto" />
      </TableCell>
      <TableCell>{meal.name}</TableCell>
      <TableCell>{meal.calories}</TableCell>
      <TableCell>{meal.protein}g</TableCell>
      <TableCell>{meal.fats}g</TableCell>
      <TableCell>{meal.carbs}g</TableCell>
      <TableCell className="text-right">{healthScore(meal.rating)}</TableCell>
      <TableCell>{meal.type}</TableCell>
      <TableCell>
        <Evals userId="testuser" traceId={traceId} spanId={spanId} />
      </TableCell>
    </TableRow>
  );
}
