import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        <div className="container content-container pt-4">{children}</div>
      </main>
    </>
  );
}
