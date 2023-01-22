import React from 'react'

const ProfileDataLine = ({ isEditing, data, item, cancelPressed }) => {
  const [initialValue, setInitialValue] = React.useState(data[item])

  React.useEffect(() => {
    setInitialValue(data[item])
  }, [cancelPressed])

  return (
    <div>
      <div style={{ display: 'flex', margin: '1vh 1vw' }}>
        <div style={{ display: 'flex', flex: 1 }}>{item}</div>
        <div
          style={{
            display: 'flex',
            flex: 2,
          }}
        >
          {isEditing ? (
            <div
              style={{
                display: 'flex',
                flex: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                }}
              >
                <input
                  value={initialValue}
                  style={{
                    border: 'none',
                    outline: 'none',
                    backgroundColor: '#dddd',
                    color: 'gray',
                  }}
                  onChange={(e) => setInitialValue(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div style={{ color: 'gray' }}>{data[item] || '---'}</div>
          )}
        </div>
      </div>
      <div className="grayLine" />
    </div>
  )
}

export default ProfileDataLine
