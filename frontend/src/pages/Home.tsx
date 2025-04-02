import { CheckCircle, Laptop, Loader2, Users, Zap } from "lucide-react";
import { Link } from "react-router";
import { useAppSelector } from "../hooks/hooks";

function Home() {
  const loading = useAppSelector((state) => state.user.loading);
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-800" size={45} />
      </div>
    );
  }
  return (
    <div className="container min-h-screen m-auto">
      <main className="flex flex-col">
        <section className="px-10 py-10">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="mt-12 space-y-2">
              <h1 className="text-4xl text-center font-bold tracking-tighter sm:text-7xl xl:text-12xl">
                Blogging Made Simple
              </h1>
              <p className="md:text-xl text-center">
                Express yourself without the complexity. Eazy helps you focus on
                what matters.
              </p>
            </div>
            <div className="mt-10 space-y-2">
              <h1 className="text-4xl text-center font-bold tracking-tighter sm:text-7xl xl:text-12xl">
                Loved by bloggers worldwide
              </h1>
              <p className="md:text-xl text-center">
                Join thousands of content creators who have simplified their
                blogging journey by Eazy.
              </p>
            </div>
            <div className="w-full mt-4 flex justify-center items-center gap-4 ">
              <Link to={'/dashboard'} className="flex rounded-md  gap-2 text-white font-semibold items-center px-4 py-2 text-base
              sm:px-4 sm:py-3 sm:text-lg bg-gray-800 hover:bg-gray-700">Start Blogging</Link>
              <Link to={'/blogs'} className="flex rounded-md  gap-2 text-white font-semibold items-center px-4 py-2 text-base
              sm:px-4 sm:py-3 sm:text-lg bg-gray-800 hover:bg-gray-700">Blogs of the day</Link>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
            </div>
          </div>
        </section>
        <section className="w-full py-4">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold underline rounded-lg px-3 py-1">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                  Everything you need to blog with ease
                </h2>
                <p className="max-w-[900px] md:text-xl">
                  Our platform is designed to make blogging accessible to
                  everyone, from beginners to professionals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Zap className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Quick Setup</h3>
                <p className="text-center sm:text-lg">
                  Get your blog up and running in minutes, not hours.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Laptop className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Intuitive Editor</h3>
                <p className="text-center sm:text-lg">
                  Write and format your content with our easy-to-use editor.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Built-in Audience</h3>
                <p className="text-center sm:text-lg">
                  Connect with readers and grow your following from day one.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to start your blogging journey?
                </h2>
                <p className="max-w-[900px] md:text-xl">
                  Join Eazy Blog today and experience the simplicity of modern
                  blogging.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
