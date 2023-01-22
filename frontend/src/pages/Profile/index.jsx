import React from 'react'

import { BsFillPersonFill } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import ProfileDataLine from './ProfileDataLine'

const displayData = ['Full Name', 'Email', 'Address']

const ProfilePage = () => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [canSave, setCanSave] = React.useState(false)
  const [cancelPressed, setCancelPressed] = React.useState(false)
  const [data, setData] = React.useState({
    'Full Name': 'Akhilendre Rawat',
    Email: 'akhil@example.com',
    Address: '123 Main Street',
  })

  const handleEditPressed = () => setIsEditing(true)

  const handleCancelPressed = () => {
    setCancelPressed((prev) => !prev)
    setIsEditing(false)
  }

  const handleSavePressed = () => {
    setIsEditing(false)
  }

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: 10,
        }}
      >
        <div className="boxShadow profileContainer">
          <div className="editProfile" onClick={handleEditPressed}>
            <FiEdit />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>
              <BsFillPersonFill
                style={{
                  fontSize: 200,
                  color: 'rgb(89, 190, 230)',
                }}
              />
            </div>
            <div
              style={{
                fontWeight: 'bold',
                fontSize: 'xx-large',
                margin: '0 10px 15px 10px',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                lineHeight: 1,
                textAlign: 'center',
              }}
            >
              {data['Full Name'] || '---'}
            </div>
          </div>
        </div>
        <div className="boxShadow profileDataContainer">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              margin: 10,
            }}
          >
            {displayData?.map((item, index) => (
              <ProfileDataLine
                key={index}
                isEditing={isEditing}
                data={data}
                item={item}
                cancelPressed={cancelPressed}
              />
            ))}
            {isEditing && (
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'end',
                  margin: 10,
                }}
              >
                <button
                  className="profileButton"
                  style={{
                    ...(canSave
                      ? { cursor: 'pointer', color: 'darkgreen' }
                      : { cursor: 'not-allowed', color: 'gray' }),
                  }}
                  onClick={handleSavePressed}
                >
                  Save
                </button>
                <button
                  className="profileButton"
                  style={{
                    color: 'red',
                    cursor: 'pointer',
                  }}
                  onClick={handleCancelPressed}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
