import "../../styles/therapistlogin.css"
export default function LoginTherapist() {
  return (
    <div className='loginTherapist'>
      <div className="containerWrapper">
        <div className="container">
          <div className="colomn">
              <form action="">
                  <div className="title">
                      <span className="colomnTitle">Welcome to <b> BunnaMind</b></span>
                  </div>
                  <h5 className="signin">
                      <b>Therapist</b> Portal
                  </h5>
                  <div className="loginrow">
                    
                    <div className="row">
                        <div className="col">
                            <div className='loginImg'>
                                <img src="wonde.png" alt="no photo" />
                            </div>
                        </div>
                        <div className="col">
                            <label htmlFor="" className='colName'>Enter Your Email</label>
                            <input 
                                type="email" 
                                className="input"
                                placeholder='Email'
                            />
                            <label htmlFor="" className='colName'>Enter Password</label>
                            <input 
                                type="Password" 
                                className="input"
                                placeholder='Password'
                            />
                            <div className="col">
                                <button className="loginbtn">
                                    Login
                                </button>
                            </div>
                            <p className='haveAccount'><a href=""><b>Forgot password</b></a></p>
                            <p className="haveAccount" style={{ color: "#393f81" }}>
                                If you haven't an account <a href=""><b>Register Now</b></a>                        
                            </p>
                        </div>                  
                    </div>
                  </div>
              </form>
          </div>
        </div>
        <footer className="bg-light text-center text-lg-start" style={{ backgroundColor: "#9A616D" }}>
            {/* Copyright */}
            <div
              className="text-center p-3"
              style={{ backgroundColor: "rgba(0, 0, 255, 0.6)", color: "white" }}
            >
              © BunnaMind 2024:
              {/* <a className="text-dark" href="https://mdbootstrap.com/">
                BunnaMind
              </a> */}
            </div>
            {/* Copyright */}
          </footer>
      </div>
    </div>
  )
}
