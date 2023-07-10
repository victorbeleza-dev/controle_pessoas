import React, { useEffect, useState } from "react";

import "../styles/pages/UserFormPage.scss"
import { cpfMask } from "../utils/cpfMask";
import { normalizePhoneNumber } from "../utils/telefoneMask";
import LoadingSpinnerButton from "../components/LoadingSpinnerButton";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

import { useForm } from "react-hook-form"


const UserFormPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isNew, setIsNew] = useState(false);
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadinData, setIsLoadingData] = useState(false);
    const [form, setForm] = useState({
        cpf: '',
        phone: '',
        name: '',
        email: ''
    })

    useEffect(() => {
        setIsLoadingData(true)
        setIsNew(false)
        if (params.id) {
            let arrayLocalStorage = localStorage.getItem('users')
            let newArray = JSON.parse(arrayLocalStorage)
            newArray.map(user => {
                if (user.cpf === params.id) {
                    console.log(params.id + " AQUIi " + user.cpf)
                    setForm(user)
                }
            })
        } else {
            setIsNew(true)
        }
        setIsLoadingData(false)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(form))
        if (validate(form).length === 0) {
            setIsLoading(true);
            let arrayLocalStorage = JSON.parse(localStorage.getItem('users'))
            let newArray = arrayLocalStorage;

            if (isNew) {
                newArray.push(form)
            } else {
                newArray = [];
                arrayLocalStorage.map(user => {
                    if (user.cpf === params.id) {
                        newArray.push(form)
                    } else {
                        newArray.push(user)
                    }
                })
            }

            localStorage.setItem('users', JSON.stringify(newArray));

            setTimeout(function () {
                setIsLoading(false)
                navigate('/')
            }, 2000)
        }
    }

    const validate = () => {
        let errors = {};
        if (form.name.length < 3)
            errors.name = "Campo deve conter 3 caracteres ou mais"

        return errors
    }

    return (
        <div className="userformpage-container">
            <div className="userformpage-content">
                {isLoadinData ? <Loading /> :
                    <form className="userformpage-form" onSubmit={onSubmit}>
                        <label className="userformpage-label">
                            <input className={!errors.lengh == 0 ? "userformpage-input-error" : "userformpage-input"}
                                placeholder="Nome completo (sem abreviações)"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </label>
                        {errors.name && <p className="error-input">{errors.name}</p>}
                        <label className="userformpage-label">
                            <input className="userformpage-input"
                                placeholder="E-mail"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </label>
                        <label className="userformpage-label">
                            <input className="userformpage-input"
                                placeholder="Telefone"
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: normalizePhoneNumber(e.target.value) })} />
                        </label>
                        <label className="userformpage-label">
                            <input className="userformpage-input"
                                placeholder="Cpf"
                                type="text"
                                name="cpf"
                                value={form.cpf}
                                onChange={(e) => setForm({ ...form, cpf: cpfMask(e.target.value) })}
                                maxLength='14' />
                        </label>
                        <button className="userformpage-button-submit" >
                            {isLoading ?
                                <div className="userformpage-loading"><LoadingSpinnerButton /></div> :
                                <span>
                                    {isNew ?
                                        <>Cadastrar</> :
                                        <>Salvar</>
                                    }
                                </span>
                            }
                        </button>
                    </form>}

            </div>
        </div>
    )
}

export default UserFormPage;