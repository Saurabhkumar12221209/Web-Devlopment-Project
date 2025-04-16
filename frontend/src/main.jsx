import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { LazyLoadImage } from "react-lazy-load-image-component";
// eslint-disable-next-line react-refresh/only-export-components
const App = lazy(() => import("./App.jsx"));
ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense
    fallback={
      <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100dvh'
      }}>
        <LazyLoadImage
          alt=""
          src="https://raw.githubusercontent.com/SandhyaR1007/eyesome-react/main/src/assets/loading.gif"
          width="130px"
          style={{
            borderRadius: "1.5rem",
          }}
        />
      </div>
    }
  >
    <App />
  </Suspense>
);
