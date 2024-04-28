import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import './SignUpPage.scss'
import {User} from "../../model/User";

interface RegisterFormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}


const registerUser = async (data: RegisterFormState) => {
    const endpoint = "/users/register"
    const response = await fetch(endpoint,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    if (!response.ok) {
        throw new Error(`Failed to sign up user: ${response.status} ${response.statusText}`)
    }
    return response.json()
}

interface UserResponse {
    id: string,
    firstName: string,
    lastName: string,
    email: string
}

export const SignUpPage = () => {
    const [error, setError] = useState<string>();
    const [user, setUser] = useState<User>()
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<RegisterFormState>();

    const onLogin = async (data: RegisterFormState) => {
        try {
            const userData: UserResponse = await registerUser(data);
            reset();
            setUser(userData)
            setError('');
        } catch (error) {
            setError('Klarte ikke å registrere deg');
            console.error(error);
        }
    };

    return <div className="container-matmatikk">
        <div className="container-center">
            <h2 className="heading-matmatikk">Registrer deg</h2>
            {error && <div>{error}</div>}
            {user && <div>Bruker med epost ${user.email} ble registrert! Log in her: </div>}
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