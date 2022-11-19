import errVec from "./bugFix.svg";

export default function Error() {
  return (
    <div className="text-center pt-5 mt-4">
      <img src={errVec} alt="repair" style={{ width: "350px" }} />
      <p className="text-center text-white mt-1" style={{ fontSize: "18px" }}>
        Somthing went wrong! Please wait a few minutes before you try again.
      </p>
    </div>
  );
}
