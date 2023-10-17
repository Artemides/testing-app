import { PropsWithChildren } from "react";
import { Navbar } from "../components/Todo/Navbar";

const TodosLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      {children}
    </>
  );
};

export default TodosLayout;
