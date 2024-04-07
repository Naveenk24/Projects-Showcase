import './index.css'

export default function ProjectsItem(props) {
  const {projectDetails} = props
  const {name, imageUrl} = projectDetails
  return (
    <li className="projects-list-item">
      <img src={imageUrl} alt={name} className="project-logo" />
      <p className="project-name"> {name}</p>
    </li>
  )
}
