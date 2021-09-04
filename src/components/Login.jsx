import React, { useState } from 'react';

function Login(props){
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    function handleChange(event){
        const {name, value} = event.target

        setUser(prevUser => {
            return {
                ...prevUser,
                [name]: value
            }
        })
    }

    function formSubmit(event){
        event.preventDefault();
        if (user.email === "") {
          alert("Please enter your email address")
          event.preventDefault();
        } else if (user.password === "") {
            alert("Please enter your password")
            event.preventDefault();
        } else {
        }
    }

    return (
        <div className="component createGoal">
            <h1>Login</h1>
            <div className="daily"> 
                <div className="daily-wrapper"> 
                    <form onSubmit={formSubmit}>
                        <input 
                            name="email"
                            type="text"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Email"
                            >
                        </input>
                        <input 
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Password"
                            >
                        </input> 
                        <button onClick={() => (props.onRegister(user))}>Submit</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login