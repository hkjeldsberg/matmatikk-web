import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import './LoginPage.scss'
import {Link} from "react-router-dom";

interface LoginFormState {
    email: string;
    password: string;
}

async function login(data: LoginFormState) {
    console.log(data)
}

export const LoginPage: React.FC = () => {
    const [error, setError] = useState<string>();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<LoginFormState>();

    const onLogin = async (data: LoginFormState) => {
        try {
            await login(data);
            reset();
            setError('');
        } catch (error) {
            setError('Klarte ikke å logge inn');
            console.error(error);
        }
    };

    return (
        <div className="container-matmatikk">
            <div className="container-center">
                <h2 className="heading-matmatikk">Logg inn</h2>
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