import { MutatingDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="row" style={{ height: "90vh" }}>
      <MutatingDots
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="14.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass="d-float justify-content-center align-items-center my-auto"
        visible={true}
      />
    </div>
  );
}
