import { validBatches } from "@/helpers/functional";
import { Project, SixWeekBatch } from "@/helpers/types";
import { filter, flow, get, map, uniqBy } from "lodash/fp";
import { FC } from "react";

export const getUniqueBatches = (projects: Project[]) =>
  flow(
    map(
      flow(
        get("batches"),
        map(get("sixWeekBatch")),
        filter(validBatches),
        map(({ idea, id }) => ({ idea, id })),
        get(0)
      )
    ),
    uniqBy("id"),
    filter((batch) => !!batch)
  )(projects);

type BatchProps = {
  batch: SixWeekBatch;
  projects: Project[];
};
const Batch: FC<BatchProps> = ({ batch, projects }) => {
  return (
    <div>
      <h4>Batch: {batch.idea}</h4>
      <ul>
        {projects
          .filter(
            ({ batches }) =>
              batches.filter(({ sixWeekBatch: { id } }) => id === batch.id)
                .length > 0
          )
          .map(({ id: projectId, project }) => (
            <li key={projectId}>{project}</li>
          ))}
      </ul>
    </div>
  );
};
export default Batch;
