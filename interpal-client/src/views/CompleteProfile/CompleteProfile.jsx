import React from 'react'
import axios from 'axios'

const CompleteProfile = () => {
    const [bio, setBio] = React.useState('')
    const [profilePicture, setProfilePicture] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(bio)
        console.log(profilePicture)
        const formData = new FormData()
        console.log(localStorage.getItem('id'))
        formData.append('bio', bio)
        formData.append('profilePicture', profilePicture)
        formData.append('userId', localStorage.getItem('id'))
        console.log(formData)
        axios.post( 'http://localhost:8000/api/users/completeprofile', formData)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    }
  return (
    <div>
        <h1>Complete Profile</h1>
        <form  onSubmit={handleSubmit}>
            <label>Bio</label>
            <textarea name="bio"  value={bio} onChange={e=>setBio(e.target.value)} />
            <label>Profile Picture</label>
            <input type="file" name="profilePicture" onChange={e=> setProfilePicture(e.target.files[0])} />
            <button>Submit</button>

        </form>
    </div>
  )
}

export default CompleteProfile