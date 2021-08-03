import { AuthorizationApp } from "authorization-app";
import { useAuth } from "context/auth-context";
import { UnauthorizationApp } from "unauthorization-app";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthorizationApp /> : <UnauthorizationApp />}
    </div>
  );
}

export default App;
