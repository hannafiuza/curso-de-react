import { SquareChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return (
    <div className="h-screen w-screen bg-pink-300 p-6 overflow-y-auto">
      <div className="w-[500px] mx-auto space-y-4 p-6">
        <div className="flex justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-white"
          >
            <SquareChevronLeft />
          </button>
          <h1 className="text-3xl text-white font-bold text-center">
            Detalhes da Tarefa
          </h1>
        </div>

        <div className="bg-rose-400 p-4 rounded-md">
          <h2 className="text-xl text-white font-bold">{title}</h2>
          <p className="text-white">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
