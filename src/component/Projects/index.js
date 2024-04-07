import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

import ProjectsItem from '../ProjectsItem/index'

import './index.css'

const responseView = {
  successView: 'SUCCESS',
  failureView: 'FAILURE',
  loadingView: 'LOADING',
}

export default function Projects(props) {
  const {categoriesList} = props
  const [initialValue, setInitialValue] = useState([])
  const [displayView, setDisplayView] = useState(responseView.loadingView)
  const [userInput, setUserInput] = useState(categoriesList[0].id)

  const apiURL = `https://apis.ccbp.in/ps/projects?category=${userInput}`
  console.log(apiURL)

  const apiCallSuccess = data => {
    setDisplayView(responseView.successView)

    const formatData = data.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.image_url,
    }))

    setInitialValue(formatData)
  }

  const apiCallFailure = () => {
    setDisplayView(responseView.failureView)
  }

  const setApiRequest = async () => {
    const response = await fetch(apiURL)
    const data = await response.json()

    if (response.ok) {
      apiCallSuccess(data.projects)
    } else {
      apiCallFailure()
    }
  }

  console.log(initialValue)
  useEffect(() => {
    setApiRequest()
  }, [userInput])

  const successView = () => (
    <ul className="projects-list">
      {initialValue.map(eachItem => (
        <ProjectsItem key={eachItem.id} projectDetails={eachItem} />
      ))}
    </ul>
  )

  const onClickTheRetryButton = () => setApiRequest()

  const failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={onClickTheRetryButton}
      >
        Retry
      </button>
    </div>
  )

  const loadingView = () => (
    <div data-testid="loader" className="spinner">
      <Loader type="ThreeDots" color=" #328af2" height={50} width={50} />
    </div>
  )

  const renderTheWebsite = () => {
    switch (displayView) {
      case responseView.successView:
        return successView()
      case responseView.failureView:
        return failureView()
      default:
        return loadingView()
    }
  }

  return (
    <>
      <nav className="nav-element">
        <img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png "
          alt="website logo"
          className="website-logo"
        />
      </nav>
      <div className="projects-container">
        <select
          className="select-input-element"
          onChange={event => setUserInput(event.target.value)}
          value={userInput}
        >
          {categoriesList.map(eachItem => (
            <option key={eachItem.id} value={eachItem.id}>
              {eachItem.displayText}
            </option>
          ))}
        </select>
        <div className="project-item-container">{renderTheWebsite()}</div>
      </div>
    </>
  )
}
