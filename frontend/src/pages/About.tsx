import {
  Award,
  Feather,
  Github,
  Heart,
  Lightbulb,
  Linkedin,
  Target,
  Users,
} from "lucide-react";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="container mx-auto min-h-screen">
      <main className="max-w-5xl 2xl:max-w-7xl p-6">
        {/* Hero Section */}
        <section className="w-full py-4">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl">
                  Our Story
                </h1>
                <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're on a mission to make blogging accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-8 md:py-10 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-center  md:text-5xl">
                  Simplifying content creation for everyone
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Founded in 2025, Eazy Blog was born from a simple observation:
                  blogging platforms were either too complex for beginners or
                  too limited for professionals. We set out to create a solution
                  that works for everyone.
                </p>
                <p className="text-muted-foreground md:text-xl">
                  Our platform combines powerful features with an intuitive
                  interface, making it easy for anyone to share their stories,
                  knowledge, and passions with the world.
                </p>
              </div>
              <div className="flex items-center justify-center"></div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="w-full py-8 md:py-10 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-6xl">
                  Our Values
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base xl:text-xl">
                  The principles that guide everything we do.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <Heart className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Passion</h3>
                <p className="text-center sm:text-xl">
                  We're passionate about helping people share their stories with
                  the world.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-center sm:text-xl">
                  We believe in the power of connection and building meaningful
                  relationships.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <Lightbulb className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-center sm:text-xl">
                  We continuously improve our platform to meet the evolving
                  needs of creators.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <Target className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Simplicity</h3>
                <p className="text-center sm:text-xl">
                  We believe that powerful tools don't have to be complicated.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <Award className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Quality</h3>
                <p className="text-center sm:text-xl">
                  We're committed to excellence in everything we create.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <Feather className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Creativity</h3>
                <p className="text-center sm:text-xl">
                  We empower creators to express themselves without limitations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-8 md:py-10 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                  Meet Our Team
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The passionate people behind Eazy Blog.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Team Member 1 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="space-y-2 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold">Kapil Kumar</h3>
                  <p className="text-sm sm:text-lg ">Developer</p>
                  <p className="text-sm sm:text-lg">
                    Former content creator with a passion for making technology
                    accessible to everyone.
                  </p>
                  <div className="flex justify-center gap-2">
                    <Link
                      to="https://www.linkedin.com/in/kapilkumar05991"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                      to="https://github.com/kapilkumar05991"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-8 md:py-10 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                  Join Our Journey
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Be part of our story and start sharing yours today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/signup">Start Blogging</Link>

                <Link to="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
