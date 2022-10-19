import { useEffect, useState } from "react";
import { AiFillWechat } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signIn, userState } from "../redux/slicers/userSlice";
import "../styles/Login.scss";


const Login = () => {
  const {user,islogin,isLoading}=useSelector(userState)
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const [userinfo, setuserinfo] = useState({
    email:"",
    password:''
  })  
    useEffect(() => {
      if(user != null) {
        navigate("/home")
      }
    }, [user])
    
    const handleSubmit = (e:any) => {
       e.preventDefault();
       dispatch(signIn(userinfo))
       navigate("/home")
    }
  return (
    <div className="formContainer">
    <div className="formWrapper">
    <AiFillWechat
        size={150}
        color="lightgreen"
        className=" bg-white rounded-3xl p-1 mt-4"
      />
      <h3 className="title">Se connecter</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
        <label htmlFor="">Votre email</label>
        <input type="email" onChange={(e)=>setuserinfo({...userinfo,email:e.target.value})} placeholder="email" />
        </div>
        <div className="form-control">
        <label htmlFor="">Mot de passe</label>
        <input type="password" onChange={(e)=>setuserinfo({...userinfo,password:e.target.value})} placeholder="*******" />
        </div>
        <button>Se connecter</button>
        {/* {err && <span>Something went wrong</span>} */}
      </form>
      <p>Vous n'avez pas de compte? <Link to={"/register"} className="span" >S'inscrire</Link></p>
    </div>
  </div>
  )
}

export default Login