import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import './SignUpPage.scss'

interface RegisterFormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

async function registerUser(data: RegisterFormState) {
    console.log(data)
}

export const SignUpPage = () => {
    const [error, setError] = useState<string>();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<RegisterFormState>();

    const onLogin = async (data: RegisterFormState) => {
        try {
            await registerUser(data);
            reset();
            setError('');
        } catch (error) {
            setError('Klarte ikke å logge inn');
            console.error(error);
        }
    };

    return <div className="container-matmatikk">
        <div className="container-center">
            <h2 className="heading-matmatikk">Registrer deg</h2>
            <form className="signup-form" onSubmit={handleSubmit(onLogin)}>
                <div className="form-group">
                    <label htmlFor="firstName">Fornavn</label>
                    <input
                        className="form-input"
                        type="text"
                        id="firstName"
                        placeholder="Fornavn"
                        {...register('firstName')}
                    />
                    <p className="form-error">{errors.firstName?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Etternavn</label>
                    <input
                        className="form-input"
                        type="text"
                        id="lastName"
                        placeholder="Etternavn"
                        {...register('lastName')}
                    />
                    <p className="form-error">{errors.lastName?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-post</label>
                    <input
                        className="form-input"
                        type="email"
                        id="email"
                        placeholder="E-post"
                        {...register('email')}
                    />
                    <p className="form-error">{errors.email?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Passord</label>
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
        </div>
    </div>
}