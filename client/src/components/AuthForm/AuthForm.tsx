import React, { useState, useRef, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from './AuthForm.module.css'; // Import CSS module

const AuthForm: React.FC = () => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current?.value;
        const enteredPassword = passwordInputRef.current?.value;

        if (!enteredEmail || !enteredPassword) {
            alert('Please fill out all fields.');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: enteredEmail,
                    password: enteredPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed.');
            }

            alert('Login successful!');
        } catch (error: any) {
            alert(error.message || 'An unexpected error occurred.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPasswordFields(!showPasswordFields);
    };

    return (
        <section className={styles.auth}>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className={styles.control}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="username" required ref={emailInputRef} />
                </div>
                <div className={styles.control}>
                    <label htmlFor="password">Password</label>
                    <div className={styles.passwordInput}>
                        <input
                            type={showPasswordFields ? "text" : "password"}
                            id="password"
                            name="password"
                            required
                            ref={passwordInputRef}
                        />
                        <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                            {showPasswordFields ? (
                                <FontAwesomeIcon icon={faEyeSlash} />
                            ) : (
                                <FontAwesomeIcon icon={faEye} />
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button type="submit">Login</button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
