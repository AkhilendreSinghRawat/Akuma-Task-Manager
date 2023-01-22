import React from 'react'

import Navbar from '../../../utils/Navbar'
import SideBar from '../SideBar'
import ListPage from './ListPage'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import {
  setIsHomePage,
  setSelectedCardIndex,
} from '../../../redux/slices/sideBarSlice'
import CreateNewModal from '../../../utils/CreateNewModal'

const SpecificProjectDetail = () => {
  const { id, name } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const createTaskNameRef = React.useRef()
  const createTaskDiscriptionRef = React.useRef()
  const { selectedCardIndex } = useSelector((state) => state.sideBarData)
  const [showError, setShowError] = React.useState(false)
  const [projectData, setProjectData] = React.useState({
    id: id,
    data: {
      tasks: {
        't-1': { id: 't-1', name: 'TO DO' },
        't-2': { id: 't-2', name: 'IN PROGRESS' },
        't-3': { id: 't-3', name: 'ON HOLD' },
        't-4': { id: 't-4', name: 'DONE ✔️' },
      },
      columns: {
        'c-1': {
          id: 'c-1',
          name: 'TO DO',
          taskIds: ['t-1', 't-2', 't-3', 't-4'],
        },
        'c-2': { id: 'c-2', name: 'IN PROGRESS', taskIds: [] },
        'c-3': { id: 'c-3', name: 'ON HOLD', taskIds: [] },
        'c-4': { id: 'c-4', name: 'DONE ✔️', taskIds: [] },
      },
      columnOrder: ['c-1', 'c-2', 'c-3', 'c-4'],
    },
  })

  React.useEffect(() => {
    dispatch(setIsHomePage(false))
  }, [])

  const handleBackArrowClick = () => {
    navigate('/home')
  }

  const dispatchIndexZero = () => {
    dispatch(setSelectedCardIndex(0))
  }

  const handleCreateTask = () => {
    const taskName = createTaskNameRef.current.value.trim()
    const taskDiscription = createTaskDiscriptionRef.current.value.trim()
    if (taskName === '' || taskDiscription === '') {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 2000)
      return
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderTop: 'solid 1px skyblue',
        }}
      >
        <SideBar />
        <div
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flex: 5,
            minHeight: '93vh',
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <CreateNewModal
            isOpen={selectedCardIndex === 3}
            onClose={dispatchIndexZero}
            nameRef={createTaskNameRef}
            discriptionRef={createTaskDiscriptionRef}
            handleSubmit={handleCreateTask}
            showError={showError}
            name={'Task'}
          />
          <div style={{ display: 'flex' }} className="headingCSS">
            <div
              onClick={handleBackArrowClick}
              style={{ marginRight: '1vw', color: 'black', cursor: 'pointer' }}
            >
              <BiArrowBack />
            </div>
            {name.substring(1)}
          </div>
          <div className="grayLine" />
          <ListPage
            projectData={projectData?.data}
            setProjectData={setProjectData}
          />
        </div>
      </div>
    </div>
  )
}

export default SpecificProjectDetail
