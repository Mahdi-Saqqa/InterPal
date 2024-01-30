import React from 'react';
import './LoginPage.css'; // Make sure to import your CSS file
import axios from 'axios';  
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null); // error state for handling errors
  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/app');
    }
  }, [])
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/login', {
      Email: email,
      Password: password
    }).then((response)=>{
      if(response.status === 200){
        localStorage.setItem('token', response.data.token);    
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("id", response.data.id);
        console.log("redirecting");
        window.location.href = '/app';
      }
    }).catch((err)=>{
      console.log(err);
      setError(err);
    })
  };

  return (
    <>   

<main>
			<div class="layout">
				<div class="main order-md-1">
					<div class="start">
						<div class="container">
							<div class="col-md-12">
								<div class="content">
									<h1>Sign in to Swipe</h1>
									<div class="third-party">
										<button class="btn item bg-face text-white">
                    <i class='bx bxl-facebook-circle' ></i>
  										</button>
										<button class="btn item bg-red">
											<i class="material-icons">Gmail</i>
										</button>
										<button class="btn item  bg-black">
											<i class="material-symbols-outlined text-white">X</i>
										</button>
									</div>
									<p class="paragrah">or use your email account:</p>
									<form onSubmit={handleSubmit}>
										<div class="form-group custom-btn">
											<input type="email" id="inputEmail" class="form-control custom-btn" placeholder="Email Address" required
											value={email}
											onChange={(e) => setEmail(e.target.value)}

											/>
											<button class="btn custom-btn icon"><i class="material-icons">mail_outline</i></button>
										</div>
										<div class="form-group custom-btn">
											<input type="password" id="inputPassword" class="form-control custom-btn" placeholder="Password" required
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											/>
											<button class="btn custom-btn icon"><i class="material-icons">lock_outline</i></button>
										</div>
										<button type="submit" class=" custom-btn2"  formaction="index-2.html">Sign In</button>
										<div class="callout">
											<span>Don't have account? <Link to="./register">Create Account</Link></span>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="aside order-md-2">
					<div class="container">
						<div class="col-md-12">
							<div class="preference">
								<h2>Hello, Friend!</h2>
								<p>Enter your personal details and start your journey with Swipe today.</p>
								<Link to="../register" class="custom-btn2 custom-btn3">Sign Up</Link>
							</div>
						</div>
					</div>
				</div>
			</div> 
		</main>
    </>
  );
};

export default LoginPage;
