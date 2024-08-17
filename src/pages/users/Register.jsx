import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import { useRegisterUserMutation } from "../../redux/auth/authApi"; // Adjust the import path as needed
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // For validation
import { toast } from "react-toastify"; // For notifications

// Validation schema
const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required("Confirm Password is required"),
});

function Register() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [registerUser, { isLoading: RegisterLoading }] = useRegisterUserMutation();

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        const { username, email, password } = values;

        try {
            const response = await registerUser({ username, email, password }).unwrap();
            toast.success("Registration successful!");
            navigate("/login"); // Redirect to login page after successful registration
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error(error.data?.message || "Registration failed");
            setFieldError("email", error.data?.message || "Registration failed"); // Set error on email
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                <p className="text-center text-gray-600 mb-4">Join us and explore!</p>

                <Formik
                    initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <Field
                                    id="username"
                                    name="username"
                                    type="text"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Your username"
                                />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="you@example.com"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="********"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <Field
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="********"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <button
                                    disabled={isSubmitting || RegisterLoading}
                                    type="submit"
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${RegisterLoading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-500"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                >
                                    {RegisterLoading ? "Registering..." : "Register"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-500">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
