import { AuthorizationApp } from "authorization-app";
import { ErrorBoundary } from "component/error-boundary";
import { FullPageError } from "component/lib";
import { useAuth } from "context/auth-context";
import { UnauthorizationApp } from "unauthorization-app";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthorizationApp /> : <UnauthorizationApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
