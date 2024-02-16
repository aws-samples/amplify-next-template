import { Project } from "@/helpers/types/data";
import { FC, useState, useEffect } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useAppContext } from "../navigation-menu/AppContext";
import { makeProjectName } from "./project-name";
import { projectsSubscription } from "@/helpers/api-operations/subscriptions";

type ProjectSelectorProps = {
  onChange: (selected: Project | null) => void;
  clearAfterSelection?: boolean;
  onCreateProject?: (projectName: string) => void;
};

const ProjectSelector: FC<ProjectSelectorProps> = ({
  onChange,
  clearAfterSelection,
  onCreateProject: createProject,
}) => {
  const { context } = useAppContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const mapOptions = () =>
    projects.map((project) => ({
      value: project.id,
      label: makeProjectName(project),
    }));

  const selectProject = (selectedOption: any) => {
    if (!(createProject && selectedOption.__isNew__)) {
      const project = projects.find((p) => p.id === selectedOption.value);
      onChange(project || null);
      if (clearAfterSelection) setSelectedOption(null);
      return;
    }
    createProject(selectedOption.label);
    if (clearAfterSelection) setSelectedOption(null);
  };

  useEffect(() => {
    const filter = {
      context: { eq: context },
      done: { ne: "true" },
    };
    const subscription = projectsSubscription(({ items, isSynced }) => {
      setProjects([...(items || [])]);
    }, filter);
    return () => subscription.unsubscribe();
  }, [context]);

  return (
    <div>
      {!createProject ? (
        <Select
          options={mapOptions()}
          onChange={selectProject}
          isClearable
          isSearchable
          placeholder="Add project..."
          value={selectedOption}
        />
      ) : (
        <CreatableSelect
          options={mapOptions()}
          onChange={selectProject}
          isClearable
          isSearchable
          placeholder="Add project..."
          value={selectedOption}
          formatCreateLabel={(input) => `Create "${input}"`}
        />
      )}
    </div>
  );
};
export default ProjectSelector;
