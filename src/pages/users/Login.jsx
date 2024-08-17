import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../../redux/auth/authApi";
import { loginSuccess } from "../../redux/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // For validation
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // For visibility icons
import { toast } from "react-toastify"; // For notifications

// Validation schema
const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        const { email, password } = values;

        try {
            const response = await loginUser({ email, password }).unwrap();
            const { user, token } = response; // Assuming response contains these
            
            dispatch(loginSuccess({ user, token }));
            toast.success("Login successful!"); // Show toast for successful login
            navigate("/"); // Redirect on successful login
        } catch (error) {
            const errorMessage = error.data?.message || "Login failed";
            setFieldError("email", errorMessage); // Set an error for the email field
            toast.error(errorMessage); // Show toast for login error
            console.error("Login error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
                <p className="text-center text-gray-600 mb-4">Please login to your account</p>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="you@example.com"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative mt-1">
                                    <Field
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"} // Use state to toggle visibility
                                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="********"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)} // Toggle the state
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    >
                                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Field
                                        type="checkbox"
                                        id="remember-me"
                                        name="remember-me"
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-800">Remember me</label>
                                </div>
                                <div className="text-sm">
                                    <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <button
                                disabled={isSubmitting || loginLoading}
                                type="submit"
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loginLoading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-500"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                            >
                                {loginLoading ? "Logging in..." : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:text-blue-500">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
