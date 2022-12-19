import vector from "./notFoundVector.svg";

export default function NotFoundpage() {
  return (
    <div className="text-center mt-2 pt-5">
      <img style={{ width: "350px" }} src={vector} alt="notFound" />
      <p className="text-white text-center" style={{ fontSize: "18px" }}>
        THE PAGE YOU WERE LOKING FOR DOESN'T EXIST!
      </p>
    </div>
  );
}
