import { useState } from "react";
import Button from "../components/Button";
import LabelledInput from "../components/LabelledInput";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Dialog from "../components/Dialog";
import { Trash, Trash2 } from "lucide-react";
import { clearUser, fetchUser } from "../features/userSlice";
import { clearBlogSlice } from "../features/blogSlice";
import { toast } from "sonner";
import { UserUpdateInput } from "../common/index";

const Profile = () => {
  const user = useAppSelector(state=>state.user.user)
  const active = useAppSelector(state=>state.user.active)
  const dispatch = useAppDispatch()
  const [markDelete,setMarkDelete] = useState(false)
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<UserUpdateInput>({
    name: user.name,
    role: user.role,
    bio: user.bio,
  });
  const [updating, setUpdating] = useState<boolean>(false);
  function handleChange(e: any) {
    let name = e.target.name.toLowerCase();
    let value = e.target.value;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }
  async function handleSubmit() {
    setUpdating(true);
    try {
      await axios.put(`${BACKEND_URL}/api/v1/user`, inputs, {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      });
      dispatch(fetchUser())
      dispatch(clearBlogSlice())
      toast.success('Updated Successfully')
      navigate('/')
    } catch (error) {
      toast.error('Update failed!!')
    } finally {
      setUpdating(false);
    }
  }
  async function handleDeleteAccount() {
    try {
      const res = await axios.delete(`${BACKEND_URL}/api/v1/user`,{
        headers:{
          Authorization:`Berear ${localStorage.getItem('token')}`
        }
      })
      const msg = res.data.msg
      localStorage.clear()
      dispatch(clearUser())
      dispatch(clearBlogSlice())
      toast.success(msg)
      navigate('/')
    } catch (error) {
      toast.error('Account Deletion Failed !!')
    }
  }
  const data = {
    icon:<Trash2/>,
    iconBg:'bg-red-500',
    title:'Delete account',
    message:'Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.',
    onClickYes:async ()=>{
      await handleDeleteAccount()
      setMarkDelete(false)
    },
    onClickNo:()=>{setMarkDelete(false)}
  }
  return (
    <div className="container max-w-5xl 2xl:max-w-7xl min-h-screen p-8 sm:p-12 m-auto">
      {markDelete && <Dialog dialog={data}/>}
      <h1 className="text-3xl sm:text-4xl font-bold">Profile</h1>
      <p className="text-sm sm:text-base text-gray-600">
        Manage your profile information and how others see you on blog.
      </p>
      <div className="border mt-4 p-6 bg-white rounded-md border-gray-300">
        <h2 className="text-2xl sm:text-3xl font-semibold">Profile Information</h2>
        <form onSubmit={(e)=>{e.preventDefault()}} className=" space-y-4">
          <div className="mt-2">
            <LabelledInput
              label="Name"
              value={inputs.name}
               className="sm:min-w-full"
              placeholder='eg. Jhon Doe'
              onChange={handleChange}
            />
            <p className="text-sm sm:text-base text-gray-600">
              This is your public display name
            </p>
          </div>
          <div>
            <LabelledInput
              label="Role"
              value={inputs.role}
               className="sm:min-w-full"
              placeholder={'eg. Artist'}
              onChange={handleChange}
            />
            <p className="text-sm sm:text-base text-gray-600">
              your role in the blog community.
            </p>
          </div>
          <div>
            <LabelledInput
             className="sm:min-w-full"
            value={inputs.bio}
             label="Bio"
             placeholder="Tell short intro about yourself"
             onChange={handleChange}/>
            <p className="text-sm sm:text-base text-gray-600">
              Write a short bio to introduce yourself to other blog readers.
            </p>
          </div>
          <div className="max-w-72 bg flex items-center gap-2 ">
            <Button
              disabled={updating}
              onClick={handleSubmit}
              variant="secondary"
            >{updating ? "Updating..." : "Update"}</Button>
            {active?
            <Button className="flex gap-1" variant="danger" onClick={() => {
              setMarkDelete(!markDelete);
            }} ><Trash size={20}/> Delete</Button>
            :
            <Link to={'/'} onClick={()=>{
              dispatch(fetchUser())
            }} className="underline text-gray-600" >skip</Link>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
