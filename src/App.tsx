import { AuthorizationApp } from "authorization-app";
import { useAuth } from "context/auth-context";
import { UnauthorizationApp } from "unauthorization-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthorizationApp /> : <UnauthorizationApp />}
    </div>
  );
}

export default App;
