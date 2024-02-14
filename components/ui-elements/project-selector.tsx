import { Project, SubNextFunctionParam } from "@/helpers/types";
import { FC, useState, useEffect } from "react";
import Select from "react-select";
import { useAppContext } from "../navigation-menu/AppContext";
import { makeProjectName } from "@/helpers/functional";
import { projectsSelectionSet } from "@/helpers/selection-sets";
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

type ProjectSelectorProps = {
  onChange: (selected: Project | null) => void;
  clearAfterSelection?: boolean;
};

const ProjectSelector: FC<ProjectSelectorProps> = ({
  onChange,
  clearAfterSelection,
}) => {
  const { context } = useAppContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const mapOptions = (projects: Project[]) =>
    projects.map((project) => ({
      value: project.id,
      label: makeProjectName(project),
    }));

  const selectProject = (selectedOption: any) => {
    const project = projects.find((p) => p.id === selectedOption.value);
    onChange(project || null);
    if (!clearAfterSelection) return;
    setSelectedOption(null);
  };

  useEffect(() => {
    const query = {
      filter: {
        context: { eq: context },
        done: { ne: "true" },
      },
      selectionSet: projectsSelectionSet,
    };
    // @ts-expect-error
    const sub = client.models.Projects.observeQuery(query).subscribe({
      next: ({ items, isSynced }: SubNextFunctionParam<Project>) => {
        setProjects([...(items || [])]);
      },
    });
    return () => sub.unsubscribe();
  }, [context]);

  return (
    <div>
      <Select
        options={mapOptions(projects)}
        onChange={selectProject}
        isClearable
        isSearchable
        placeholder="Select project..."
        value={selectedOption}
      />
    </div>
  );
};
export default ProjectSelector;
