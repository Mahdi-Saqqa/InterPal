import React from 'react'
import { useOutletContext, useParams, Link, Outlet } from "react-router-dom";



const EditProfile = () => {
  const headerStyle = {
    minHeight: "600px",
    backgroundImage:
      "url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center top",
  };
  const [darkMode] = useOutletContext();

  return (
<div div className='profile-container'>
      <div
            className="header p-5 pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style={headerStyle}
          >          
          </div>
          <div
          className={`${darkMode === true ? " " : ""}  CustomUserContainer border-radius mt--7  mb-5 `}
        >      <div className="card  col col-10 col-sm-12 px-0 shadow">
        <div className="card-header border-0  m-0">
          <div className="row align-items-center">
            <div className="col-8">
              <h3 className="mb-0 text-primary">My account</h3>
            </div>
            <div className="col-4 text-right">
              <button type="submit" className="btn btn-sm btn-primary">Save</button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form>
            <h6 className="heading-small text-muted mb-4">User information</h6>
            <div className="pl-lg-4">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group focused">
                    <label className="form-control-label" htmlFor="input-username">Username</label>
                    <input type="text" id="input-username" className="form-control form-control-alternative" placeholder="Username" value="lucky.jesse" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-control-label" htmlFor="input-email">Email address</label>
                    <input type="email" id="input-email" className="form-control form-control-alternative" placeholder="jesse@example.com" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group focused">
                    <label className="form-control-label" htmlFor="input-first-name">First name</label>
                    <input type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="First name" value="Lucky" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group focused">
                    <label className="form-control-label" htmlFor="input-last-name">Last name</label>
                    <input type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Last name" value="Jesse" />
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <h6 className="heading-small text-muted mb-4">Contact information</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group focused">
                          <label className="form-control-label" for="input-address">Address</label>
                          <input id="input-address" className="form-control form-control-alternative" placeholder="Home Address" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" type="text"/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group focused">
                          <label className="form-control-label" for="input-city">City</label>
                          <input type="text" id="input-city" className="form-control form-control-alternative" placeholder="City" value="New York"/>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group focused">
                          <label className="form-control-label" for="input-country">Country</label>
                          <input type="text" id="input-country" className="form-control form-control-alternative" placeholder="Country" value="United States"/>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label className="form-control-label" for="input-country">Postal code</label>
                          <input type="number" id="input-postal-code" className="form-control form-control-alternative" placeholder="Postal code"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4"/>
                  <h6 className="heading-small text-dark mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <div className="form-group text-dark focused">
                      <label>About Me</label>
                      <textarea rows="4" className="form-control form-control-alternative" placeholder="A few words about you ...">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
                    </div>
                  </div>
          </form>
        </div>
      </div>
    </div>
</div>
  )
}

export default EditProfile