import { Participant, SubNextFunctionParam } from "@/helpers/types";
import { FC, useState, useEffect } from "react";
import { type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Select from "react-select";
import { personSelectionSet } from "@/helpers/selection-sets";

const client = generateClient<Schema>();

type PeopleSelectorProps = {
  onChange: (selected: Participant | null) => void;
  clearAfterSelection?: boolean;
};
const PeopleSelector: FC<PeopleSelectorProps> = ({
  onChange,
  clearAfterSelection,
}) => {
  const [people, setPeople] = useState<Participant[]>([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const mapOptions = () =>
    people.map((person) => ({
      value: person.id,
      label: person.name,
    }));

  const selectPerson = (selectedOption: any) => {
    const person = people.find((p) => p.id === selectedOption.value);
    onChange(person || null);
    if (!clearAfterSelection) return;
    setSelectedOption(null);
  };

  useEffect(() => {
    const query = {
      selectionSet: personSelectionSet,
    };
    // @ts-expect-error
    const sub = client.models.Person.observeQuery(query).subscribe({
      next: ({ items, isSynced }: SubNextFunctionParam<Participant>) => {
        setPeople([...items]);
      },
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <div>
      <Select
        options={mapOptions()}
        onChange={selectPerson}
        isClearable
        isSearchable
        placeholder="Select person..."
        value={selectedOption}
      />
    </div>
  );
};
export default PeopleSelector;
