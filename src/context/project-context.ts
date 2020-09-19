import { createContext } from 'react'

interface IProjectContextProps {
    currentProject: any,
    setCurrentProject: (id:any) => void
    projects?: any[],
    setProjects: (project:any) => void
};

const ProjectContext = createContext({} as IProjectContextProps);

export default ProjectContext;