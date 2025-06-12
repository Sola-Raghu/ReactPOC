import { useFormik } from 'formik';
// import * as Yup from 'yup';

function RegistrationFormFormik() {
    const validate = (values: { name: string; email: string; password: string; confirmPassword: string }) => {
        const errors: { [key: string]: string } = {};

        if (!values.name) {
            errors.name = 'Name is required';
        } else if (values.name.length < 3) {
            errors.name = 'Name must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(values.name)) {
            errors.name = 'Name can only contain letters, numbers, and underscores';
        }


        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords must match';
        }

        return errors;
    };
    // const validationSchema = Yup.object({
    //     name: Yup.string().required('Name is required'),
    //     email: Yup.string().email('Invalid email address').required('Email is required'),
    //     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    //     confirmPassword: Yup.string()
    //         .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    //         .required('Confirm Password is required')
    // });
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
        onReset: () => {
        }
    });

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className="bg-white p-6 rounded shadow w-96">
                <h2 className="text-xl font-bold mb-4">Registration Form</h2>

                <div className="mb-4">
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className="w-full p-2 border rounded"
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="text-red-500 text-sm">{formik.errors.name}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="w-full p-2 border rounded"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm">{formik.errors.email}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className="w-full p-2 border rounded"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-sm">{formik.errors.password}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        className="w-full p-2 border rounded"
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                    )}
                </div>

                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
                    <button type="reset" className="bg-gray-300 text-black px-4 py-2 rounded">Reset</button>
                </div>
            </form>
        </div>
    );
}

export default RegistrationFormFormik;
