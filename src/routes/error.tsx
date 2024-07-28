import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="text-center p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg text-gray-700 mb-4">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500">
        <i className="italic">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}