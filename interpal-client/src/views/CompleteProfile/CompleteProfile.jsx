import React, { useState, useRef, useEffect}  from 'react'
import axiosInstance from '../../Config/axiosInstance '
import axios from 'axios'
import './CompleteProfile.css'
import emailjs from 'emailjs-com';


const CompleteProfile = (props) => {
    const { user } = props;
    const [currentStep, setCurrentStep] = useState(1);
    const fieldsets = useRef([]);
    const progressBarItems = useRef([]);
    const [code,setCode] = useState('');
    const [CodeError,setCodeError] = useState('');
    const [previewSrc, setPreviewSrc] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    const [profilePicture,setProfilePicture] = useState(null);
    const handleFileChange = (e) => {
            setProfilePicture(e.target.files[0]);
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setPreviewSrc(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);


      };

    const uploadImage = () => {
        const formData = new FormData();
        formData.append('profilePicture', profilePicture);
        const token = localStorage.getItem('userToken');
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
        axios.post( 'http://localhost:8000/api/user/uploadProfilePicture', formData, config)
        .then((response)=>{
            console.log(response);
            setPreviewSrc(response.data.url);
            handleNext();
        }).catch((err)=>{
            console.log(err);
        })
    }
    const sendCode = (e)=>{
        e.preventDefault();
        console.log(code);
        axiosInstance.post('/user/activate',{code})
        .then((response)=>{
            console.log(response);
            if(response.status === 200){
                handleNext();
            }
        }).catch((err)=>{
            console.log(err);
            setCodeError('Invalid or expired Code')
            
        })
    }
    const handleResend = (e)=>{
      e.preventDefault();
      axiosInstance.get('/user/resend')
      .then((res)=>{
        console.log(res.data);
        let user = res.data;
        return emailjs.send('service_4oj1jfh', 'template_fdccufu', {
            user_code: user.activationToken,
            user_name: user.firstName + " " + user.lastName,
            toEmail: user.email,
        }, 'pHlf1MseO9mIByVr6');
    })
    .then((result) => {
        console.log('email sent');
        console.log(result.text);
    
      }).catch((err)=>{
        console.log('error');
          console.log(err);
      })
    }
    useEffect(() => {
        fieldsets.current = Array.from(document.querySelectorAll('fieldset'));
        progressBarItems.current = Array.from(document.querySelectorAll('#progressbar li'));
        console.log(user.profilePic);
        if(!(user.profilePic===null || user.profilePic === undefined)){
            setCurrentStep(3);
            progressBarItems.current[0].classList.add('active');
            progressBarItems.current[1].classList.add('active');
            progressBarItems.current[2].classList.add('active');
            fieldsets.current[0].style.display = 'none';
            fieldsets.current[2].style.display = 'block';

        }

        else if(user.activated){
            setCurrentStep(2);
            progressBarItems.current[0].classList.add('active');
            progressBarItems.current[1].classList.add('active');
            fieldsets.current[0].style.display = 'none';
            fieldsets.current[1].style.display = 'block';
        }

      }, []);
    
      const handleNext = () => {
        const current_fs = fieldsets.current[currentStep - 1];
        const next_fs = fieldsets.current[currentStep];
    
        progressBarItems.current[currentStep - 1].classList.add('active');
        next_fs.style.display = 'block';
        current_fs.style.display = 'none';
    
        setCurrentStep((prevStep) => prevStep + 1);
    

      };
    

  return (
<div class="container-fluid" id="grad1">
    <div class="row justify-content-center mt-0">
        <div class="col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 mt-5 mb-2">
            <div class="card px-0 pt-4 pb-0 mt-3 mb-3">
                <h2><strong>Complete your profile</strong></h2>
                <p>Fill your information to help Us know you better!</p>
                <div class="row">
                    <div class="col-md-12 mx-0">
                        <form id="msform">
                            <ul id="progressbar">
                                <li className="active" id="account"><strong>Email</strong></li>
                                <li id="personal"><strong>Picture</strong></li>
                                <li id="payment"><strong>Payment</strong></li>
                                <li id="confirm"><strong>Finish</strong></li>
                            </ul>
                            <fieldset>
                                <div class="form-card text-center">
                                    <h1>Verify your Email Adress</h1>
                                    <p>Check your email for a link to verify your email address. If it doesn’t appear within a few minutes, check your spam folder.</p>
                                    <p>Didn’t receive a link? <button className=" btn-link" onClick={handleResend}>Resend</button>
                                    </p>
                                    <form>
                                    <label className="col-3">Activation Code:</label>

                                    <div className="form-group">
                                        <input
                                        value={code}
                                        onChange={(e)=>setCode(e.target.value)}

                                        className="col-9 m-auto"
                                        type="text"
                                        name="Activation Code"
                                        placeholder="Enter your Code"
                                        pattern="[1-9]{1}[0-9]{5}"
                                        required
                                        />
                                        {CodeError && <div className="text-danger">{CodeError}</div>}
                                    </div>
                                    </form>
                                </div>
                                <input type="button" name="next" class="next action-button"  onClick={sendCode} value="Verify"/>
                            </fieldset>
                            <fieldset>
                                <div class="form-card">
                                    <h2 class="fs-title">Profile Picture</h2>
                                    <div class="picture-container">
                                        <div class="picture">
                                            <img src={previewSrc} class="picture-src" id="wizardPicturePreview" title=""/>
                                            <input onChange={handleFileChange} type="file"  name="profilePicture" id="wizard-picture" class="" />
                                        </div>
                                        <h6 class="">Choose Picture</h6>

    </div>
                                </div>
                                <input type="button" name="next" class="next action-button" value="Next Step"  onClick={uploadImage} />
                            </fieldset>
                            <fieldset>
                                <div class="form-card">
                                    <h2 class="fs-title">Payment Information</h2>
                                    <div class="radio-group">
                                        <div class='radio' data-value="credit"><img src="https://i.imgur.com/XzOzVHZ.jpg" width="200px" height="100px"/></div>
                                        <div class='radio' data-value="paypal"><img src="https://i.imgur.com/jXjwZlj.jpg" width="200px" height="100px"/></div>
                                        <br/>
                                    </div>
                                    <label class="pay">Card Holder Name*</label>
                                    <input type="text" name="holdername" placeholder=""/>
                                    <div class="row">
                                        <div class="col-9">
                                            <label class="pay">Card Number*</label>
                                            <input type="text" name="cardno" placeholder=""/>
                                        </div>
                                        <div class="col-3">
                                            <label class="pay">CVC*</label>
                                            <input type="password" name="cvcpwd" placeholder="***"/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-3">
                                            <label class="pay">Expiry Date*</label>
                                        </div>
                                        <div class="col-9">
                                            <select class="list-dt" id="month" name="expmonth">
                                                <option selected>Month</option>
                                                <option>January</option>
                                                <option>February</option>
                                                <option>March</option>
                                                <option>April</option>
                                                <option>May</option>
                                                <option>June</option>
                                                <option>July</option>
                                                <option>August</option>
                                                <option>September</option>
                                                <option>October</option>
                                                <option>November</option>
                                                <option>December</option>
                                            </select>
                                            <select class="list-dt" id="year" name="expyear">
                                                <option selected>Year</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <input type="button" name="make_payment" class="next action-button" value="Confirm"  onClick={handleNext} />
                            </fieldset>
                            <fieldset>
                                <div class="form-card">
                                    <h2 class="fs-title text-center">Success !</h2>
                                    <br/><br/>
                                    <div class="row justify-content-center">
                                        <div class="col-3">
                                            <img src="https://img.icons8.com/color/96/000000/ok--v2.png" class="fit-image"/>
                                        </div>
                                    </div>
                                    <br/><br/>
                                    <div class="row justify-content-center">
                                        <div class="col-7 text-center">
                                            <h5>You Have Successfully Signed Up</h5>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default CompleteProfile