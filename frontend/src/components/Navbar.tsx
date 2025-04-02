import { Feather, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { clearUser, fetchUser } from "../features/userSlice";
import useColor from "../hooks/useColor";
import useLetter from "../hooks/useLetter";
import { toast } from "sonner";
import { clearBlogSlice } from "../features/blogSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state.user.active);
  const name = useAppSelector((state)=>state.user.user.name)
  
  function logout(){
    localStorage.removeItem('token')
    dispatch(clearUser())
    dispatch(clearBlogSlice())
    toast.success('Signout Successfully!!')
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !active) {
      dispatch(fetchUser());
    }
  }, [active]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const color = useColor(name)
  const letters = useLetter(name)

  return (
    <nav className="bg-slate-50 border-b-1 shadow-sm border-gray-400">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to={"/"} className="text-2xl sm:text-3xl font-extrabold">
                {" "}
                Eazy
              </Link>
              <Feather size={24} />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/blogs"
                  className="rounded-md px-3 py-2 text-lg font-medium hover:bg-slate-200"
                >
                  Blogs
                </Link>
                <Link
                  to="/blogs"
                  className="rounded-md px-3 py-2 text-lg font-medium hover:bg-slate-200"
                >
                  Latest
                </Link>
                <Link
                  to="/about"
                  className="rounded-md px-3 py-2 text-lg font-medium hover:bg-slate-200"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <!-- Profile dropdown --> */}
            {active?
            <div className="relative ml-3">
              <div>
                <button
                  className="cursor-pointer"
                  onClick={() => setVisible(!visible)}
                >
                  <span
                    className={` size-10 min-w-9 font-semibold rounded-full flex items-center justify-center ${color}`}
                  >
                    {letters}
                  </span>
                </button>
              </div>
              <div
                className={`${
                  visible ? "absolute" : "hidden"
                } right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg`}
              >
                <Link
                  to="/profile"
                  onClick={() => setVisible(false)}
                  className="block px-4 py-2 text-sm sm:text-base font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setVisible(false)}
                  className="block px-4 py-2 text-sm sm:text-base font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  to="/"
                  onClick={
                    () => {
                      setVisible(false);
                      logout()
                    }
                  }
                  className="block px-4 py-2 text-sm sm:text-base font-semibold text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Logout
                </Link>
              </div>
            </div>
            :
            <Link to={'/signup'} className="flex rounded-md  gap-2 text-white font-semibold items-center px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-800 hover:bg-gray-700"><LogIn size={20}/>Signup</Link>
            }
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="sm:hidden">
        {isOpen && (
          <div className="space-y-1 px-2 pt-2 pb-3">
            <Link
              to="/blogs"
              onClick={() => setIsOpen(false)}
              className="block rounded-md hover:bg-gray-200 px-3 py-2 text-base font-medium"
            >
              Blogs
            </Link>
            <Link
              to="blogs"
              onClick={() => setIsOpen(false)}
              className="block rounded-md hover:bg-gray-200 px-3 py-2 text-base font-medium"
            >
              Latest
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block rounded-md hover:bg-gray-200 px-3 py-2 text-base font-medium"
            >
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
