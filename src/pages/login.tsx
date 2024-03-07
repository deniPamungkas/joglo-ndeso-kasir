import { useContext, useEffect } from "react"
import Button from "../components/atom/button"
import { AuthContext } from "../context/authContext"
import { useFormik } from "formik"
import { ToastContainer, toast } from "react-toastify"

const Login = () => {
  const { login, error, loading, setError, userData, warning, setWarning } = useContext(AuthContext)
  //handle form
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: () => { }
  })
  const handleChangeForm = (e) => {
    formik.setFieldValue(e.target.name, e.target.value)
  }
  const handleSubmitForm = (e) => {
    e.preventDefault()
    login(formik.values)
  }

  //set error dan set warning kembali ke null
  useEffect(() => {
    setError(null);
  }, [error]);

  useEffect(() => {
    setWarning(null);
  }, [warning]);

  error && toast.error(error.response.data, {
    position: 'top-right',
    draggable: true
  })

  warning && toast.warning(warning.message, {
    position: 'top-right',
    draggable: true
  })
  return (
    <div className="bg-cyan-300 w-full h-screen flex justify-center items-center">
      <form
        action=""
        onSubmit={handleSubmitForm}
        className="w-[90%] md:w-[400px] flex flex-col gap-y-8"
      >
        <h1 className="font-bold text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Login First
        </h1>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChangeForm}
            type="email"
            placeholder="email"
            id="email"
            name="email"
            className="h-[50px] px-3 rounded-md outline-none"
            required
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChangeForm}
            type="password"
            placeholder="password"
            id="password"
            name="password"
            className="h-[50px] px-3 rounded-md outline-none"
            required
          />
        </div>
        <p className="text-end -mt-6">
          <a href="#">Forgot Password?</a>
        </p>
        <Button type='submit' onClick={() => { }} className={`${loading ? "bg-gray-500" : "bg-gradient-to-r from-purple-400 to-pink-600"}  h-[50px] rounded-md font-semibold text-white`}>
          {loading && <img src="/images/spinner.png" className="w-5 h-5 mr-2 animate-spin" />}
          Login
        </Button>
        <span className="text-center">
          Doesn't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            Register
          </a>
        </span>
        <ToastContainer limit={3} />
      </form>
    </div>
  )
}

export default Login