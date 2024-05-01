import "../../styles/therapisthome.css"

export default function TherapistHome() {
  return (
    <div className='thrapisthome'>
      <div className='topbar'>
            <div className="topbarWrapper">
                <div className="topbarLeft">
                    <img src="wonde.png" alt="" className="logoImg"/>
                    <span className="topbarHome">Home</span>
                </div>
                <div className="topbarCenter">
                    <input type="text" className="searchInput" placeholder='Search Here....' />
                    {/* add search icon here */}
                </div>
                <div className="topbarRight">
                    <span className="communitySpace">Join Community</span>
                    {/* //add notification icon Here */}
                    <span className="notification">Notification</span>
                    <div className="profile">
                        <img src="" alt="" className="profileImg" />
                        {/* //manage profile and logout is dispayed when click on profile under this  */}
                        <span className="profileName">Profile</span>
                    </div>  
                    <div className="language">
                        <select
                            // value={selectedLanguage}
                            // onChange={e=>setLanguage(e.target.value)}
                            className="form-select form-select-lg mb-3 preferlanguage"
                            >
                            <option value="English">English</option>
                            <option value="Amharic">Amharic</option>
                            <option value="Oromo">Oromo</option>
                            <option value="Sumalic">Sumalic</option>
                            <option value="Tigrigna">Tigrigna</option>                            
                        </select>     
                    </div> 
                </div>

            </div>
        </div>
        <div className="therapistContainer">
            <div className="therapistInfo">
                <h2 className="therapistTitle">
                    Dr.John's Working Space
                </h2>
                <span className="therapistHello">Hello Dr.John!</span>
                <div className="therapistDesc">
                    <p className="therapistIdea">
                    Welcome to BunnaMind, Doctor!
                    Hello and greetings from BunnaMind! We're delighted to have you here. 
                    As a mental health professional, your commitment to supporting others 
                    is truly commendable. With BunnaMind's innovative online therapy 
                    platform, you're equipped with the tools and resources to provide 
                    exceptional care to your clients. At BunnaMind, we understand the 
                    importance of creating a supportive and efficient environment for 
                    therapists like you. Our platform offers secure and user-friendly 
                    features designed to enhance your practice and improve client outcomes. 
                    From seamless appointment scheduling to confidential video conferencing, 
                    BunnaMind empowers you to deliver high-quality care with ease. 
                    Thank you for choosing BunnaMind as your partner in mental health care. 
                    Together, we can make a meaningful difference in the lives of 
                    individuals seeking support and guidance.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
