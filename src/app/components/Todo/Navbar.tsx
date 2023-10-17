import Header from "./Header/Header";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 p-2 drop-shadow-xl bg-orange-600 z-10">
      <div className="max-w-xl mx-auto flex justify-center">
        <Header title="Todo App" />
      </div>
    </nav>
  );
};
