import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import Layout from "./components/Layout";
import '@fontsource-variable/inter';
import '@fontsource/noto-mono';

export default function App() {
  return (
    <Router
      root={props => (
        <Layout>
          <Suspense>{props.children}</Suspense>
        </Layout>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
