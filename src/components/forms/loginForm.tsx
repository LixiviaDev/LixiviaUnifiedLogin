//https://bootsnipp.com/snippets/vl4R7

import React, { useState } from 'react'
import './login.css'
import configData from '../../config.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { LanguageManager } from '../../typeScript/managers/languageManager';
import { Languages } from '../../typeScript/enums/language.enum';

export default function LoginForm(props: any) {

    const [user, _setUser] = useState<string>("");
    const [password, _setPassword] = useState<string>("");

    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    const [submitButtonReference] = useState<React.RefObject<any>>(React.createRef());

    async function submitLogIn(e : any) {
        e?.preventDefault();

        try{
            let response = await fetch(`${configData["API_URL"]}/login`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({user: user, password: password})
              });
            
            if(response.status === 200 || response.status === 201){
                let data = await response.json();
    
                localStorage.setItem("token", data?.token);
    
                window.location.assign("/");
            } else if (response.status === 403) {
                setSubmitAsInvalid();
            }
        } catch (ex) {
            console.error(ex);
        }
    }

    return(
        <>
        <div className='login-form-container'>
        <div className="login-form my-5">
            <div className="form-header">
                <div className="title">{languageManager.get("Shared.LOGIN")}</div>
            </div> 
            <div className="w-100 px-5 mt-4 d-flex justify-content-around align-items-center">
                <button className='bg-light rounded-circle text-center fw-bold border-0 text-capitalize' 
                        style={{width: "39px", height: "39px"}}
                        onClick={() => languageManager.changeAppLanguage(Languages.ES)}>
                            {Languages.ES}
                </button>
                <button className='bg-light rounded-circle text-center fw-bold border-0 text-capitalize' 
                        style={{width: "39px", height: "39px"}}
                        onClick={() => languageManager.changeAppLanguage(Languages.EN)}>
                        {Languages.EN}
                </button>
                <button className='bg-light rounded-circle text-center fw-bold border-0 text-capitalize' 
                        style={{width: "39px", height: "39px"}}
                        onClick={() => languageManager.changeAppLanguage(Languages.CA)}>
                        {Languages.CA}
                </button>
            </div>
            <div className='w-100 px-5 mt-3 d-flex justify-content-end'>
                <a className='p-2 text-dark filledButton' style={{backgroundColor: "#28bff6"}} href="/signup">
                    <p className='m-0 fw-bold' style={{fontSize:" smaller"}}>{languageManager.get("Shared.SIGN_UP")}</p>
                </a>
            </div>
            <form onSubmit={submitLogIn} className="form-container px-5" method='post'>
                <div className="form-element mt-3">
                    <label htmlFor="login-username">
                        <FontAwesomeIcon icon={faUser} />
                    </label>
                    <input type="text" id="login-username" onChange={(e) => setUser(e.target.value)} placeholder={languageManager.get("Login.USERNAME")}/>
                </div>
                <div className="form-element mt-4">
                    <label htmlFor="login-password">
                        <FontAwesomeIcon icon={faKey} />
                    </label>
                    <input type="password" id="login-password" onChange={(e) => setPassword(e.target.value)} placeholder={languageManager.get("Login.PASSWORD")}/>
                </div>
                <div className="form-element mt-5">
                    <input  ref={submitButtonReference}
                            className="px-3 bg-light" 
                            type="submit" 
                            value={languageManager.get("Shared.LOG_IN")} />
                </div>
            </form>
        </div>
        </div>
        </>
    );

    function onInputChanged(){
        resetSubmitStyle();
    }

    function setUser(value: string) {
        onInputChanged();

        _setUser(value);
    }

    function setPassword(value: string) {
        onInputChanged();

        _setPassword(value);
    }

    function resetSubmitStyle(){
        const submitButton : HTMLInputElement = submitButtonReference.current;

        submitButton.classList.remove("invalidAction");
        submitButton.value = languageManager.get("Shared.LOG_IN");
    }

    function setSubmitAsInvalid(){
        const submitButton : HTMLInputElement = submitButtonReference.current;

        submitButton.classList.add("invalidAction");
        submitButton.value = languageManager.get("Login.INVALID_USER");
    }

    // function setState(varname : any, value : any){
    //     if(value != null)
    //         eval(`set${capitalizeFirstLetter(varname)}("${value}")`);
    // }

    // function capitalizeFirstLetter(string : any) {
    //     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    //   }
      
}