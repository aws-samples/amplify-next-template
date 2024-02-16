import { Participant } from "@/helpers/types/data";
import { FC, useState, useEffect } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { peopleSubscription } from "@/helpers/api-operations/subscriptions";

type PeopleSelectorProps = {
  onChange: (selected: Participant | null) => void;
  clearAfterSelection?: boolean;
  onCreatePerson?: (name: string) => void;
};

const PeopleSelector: FC<PeopleSelectorProps> = ({
  onChange,
  clearAfterSelection,
  onCreatePerson: createPerson,
}) => {
  const [people, setPeople] = useState<Participant[]>([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const mapOptions = () =>
    people.map((person) => ({
      value: person.id,
      label: person.name,
    }));

  const selectPerson = (selectedOption: any) => {
    console.log("selectPerson", !createPerson, selectedOption);
    if (!(createPerson && selectedOption.__isNew__)) {
      console.log("add participant");
      const person = people.find((p) => p.id === selectedOption.value);
      onChange(person || null);
      if (clearAfterSelection) setSelectedOption(null);
      return;
    }
    createPerson(selectedOption.label);
    if (clearAfterSelection) setSelectedOption(null);
  };

  useEffect(() => {
    const subscription = peopleSubscription(({ items, isSynced }) => {
      setPeople([...(items || [])]);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      {!createPerson ? (
        <Select
          options={mapOptions()}
          onChange={selectPerson}
          isClearable
          isSearchable
          placeholder="Add person..."
          value={selectedOption}
        />
      ) : (
        <CreatableSelect
          options={mapOptions()}
          onChange={selectPerson}
          isClearable
          isSearchable
          placeholder="Add person..."
          value={selectedOption}
          formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
        />
      )}
    </div>
  );
};
export default PeopleSelector;
