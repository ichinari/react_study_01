import { useParams, useNavigate } from "react-router-dom";

function Detail() {
  const { name } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <p className="mb-4 text-2xl">
          Pokemon name: <span className="font-bold">{name}</span>
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 hover:text-blue-600 underline"
        >
          back
        </button>
      </div>
    </>
  );
}
export default Detail;
