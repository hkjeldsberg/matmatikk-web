import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import './LoginPage.scss'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../AuthProvider/AuthProvider";
import {fetchUser} from "../../service/UserService";

interface LoginFormState {
    email: string;
    password: string;
}

const loginUser = async (data: LoginFormState) => {
    const endpoint = "/auth/login"
    const response = await fetch(endpoint,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    if (!response.ok) {
        throw new Error(`Failed to login: ${response.status} ${response.statusText}`)
    }
    return response.json()
}

interface LoginResponse {
    accessToken: string
}

export const LoginPage: React.FC = () => {
    const {login, isLoggedIn} = useAuth()
    const [error, setError] = useState<string>();
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<LoginFormState>();

    const onLogin = async (data: LoginFormState) => {
        try {
            const loginData: LoginResponse = await loginUser(data);
            const userData = await fetchUser(loginData.accessToken);
            login(loginData.accessToken, userData);
            reset();
            setError('');
        } catch (error) {
            setError('Klarte ikke å logge inn');
            console.error(error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="container-matmatikk">
            <div className="container-center">
                <h2 className="heading-matmatikk">Logg inn</h2>
                {error && <div>{error}</div>}
                <form className="login-form" onSubmit={handleSubmit(onLogin)}>
                    <div className="form-group">
                        <label htmlFor="email"></label>
                        <input
                            className="form-input"
                            type="text"
                            id="email"
                            placeholder="E-post"
                            {...register('email')}
                        />
                        <p className="form-error">{errors.email?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"></label>
                        <input
                            className="form-input"
                            type="password"
                            id="password"
                            placeholder="Passord"
                            {...register('password')}
                        />
                        <p className="form-error">{errors.password?.message}</p>
                    </div>
                    <button type="submit" className="btn-matmatikk form-submit">
                        Logg inn
                    </button>
                </form>
                <div className="form-link">
                    <Link to="/signup">Ny bruker?</Link>
                </div>
            </div>
        </div>
    )
}