import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { useAppSelector } from "./hooks/hooks";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import { Footer } from "./components/Footer";
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";
import 'highlight.js/styles/github-dark.css'

const Blogs = lazy(() => import("./pages/Blogs"));
const Publish = lazy(() => import("./pages/Publish"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const About = lazy(() => import("./pages/About"));
const Edit = lazy(() => import("./pages/Edit"));

function App() {
  const active = useAppSelector((state) => state.user.active);
  return (
    <div className="bg-slate-50">
      <Toaster
        toastOptions={{
          style: {
            fontSize: "16px",
          },
        }}
        position="top-center"
      />

      <Suspense fallback={<Loader />}>
        <Navbar />
        <Routes>
          <Route path="blogs" element={<Blogs />} />
          <Route path="publish" element={active ? <Publish /> : <Signin />} />
          <Route path="blog/:id" element={<BlogDetails />} />
          <Route
            path="dashboard"
            element={active ? <Dashboard /> : <Signin />}
          />
          <Route path="/edit/:id" element={active ? <Edit /> : <Signin />} />
          <Route path="profile" element={<Profile />} />

          <Route path="about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
}

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-gray-800" size={45} />
    </div>
  );
};

export default App;
