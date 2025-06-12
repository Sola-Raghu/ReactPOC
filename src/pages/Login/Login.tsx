import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Login.module.css';

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18" 
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);


const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const formik = useFormik<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({ 
            email: Yup.string()
                .email('Invalid email address format')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: (values, { setSubmitting }) => { 
            console.log('Login attempt (validation passed):', values);
            setTimeout(() => {
                console.log('Login successful (based on validation only)');
                const nameFromName = values.email.split('@')[0];
                login({ name: nameFromName || 'User', email: values.email });
                navigate('/dashboard/movies', { replace: true });
                setSubmitting(false);
            }, 500);
        },
    });

    return (
        <div className={styles.loginContainer}>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={formik.touched.email && formik.errors.email ? styles.inputError : ''}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className={styles.errorMessage}>{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className={formik.touched.password && formik.errors.password ? styles.inputError : ''}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className={styles.errorMessage}>{formik.errors.password}</div>
                    ) : null}
                </div>

                <button
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    className={styles.submitButton}
                >
                    <span>
                        {formik.isSubmitting ? 'Logging in...' : 'Login'}
                    </span>
                    <LoginIcon />
                </button>

            </form>
        </div>
    );
};

export default Login;