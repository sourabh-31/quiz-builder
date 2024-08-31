import Spinner from "./Spinner";

export default function PageSpinner() {
  return (
    <div className="relative flex h-[50vh] items-center justify-center">
      <div className="absolute top-[50%] -translate-y-1/2 transform">
        <Spinner />
      </div>
    </div>
  );
}
