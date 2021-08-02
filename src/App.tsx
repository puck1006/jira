// import { ProjectListScreen } from "screens/project-list";
// import { TsReactTest } from "try-use-array";

import { AppProviders } from "context";
import { LoginScreen } from "screens/login";

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {/* <TsReactTest /> */}
      <AppProviders>
        <LoginScreen />
      </AppProviders>
    </div>
  );
}

export default App;
