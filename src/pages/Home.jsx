import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import registerRequest from "../features/register/registerApi";

const Home = () => {
  const state = useSelector((state) => state.registerReducer);
  const dispatch = useDispatch();
  return (
    <div className="home">
      <h1>Home Page</h1>
      {state.isLoading && <p>"Loading..."</p>}
      {state.erros && (
        <p>
          {state.erros.map((er) => (
            <li>{er}</li>
          ))}
        </p>
      )}
      <Button onClick={() => dispatch(registerRequest(state.supplier))}>
        Click me pleaase!!!!!!!!!!
      </Button>
    </div>
  );
};

export default Home;
