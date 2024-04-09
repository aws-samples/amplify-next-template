import usePeople from "@/api/usePeople";
import { FC, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

type PeopleSelectorProps = {
  onChange: (personId: string) => void;
  clearAfterSelection?: boolean;
  allowNewPerson?: boolean;
};

const PeopleSelector: FC<PeopleSelectorProps> = ({
  onChange,
  clearAfterSelection,
  allowNewPerson,
}) => {
  const { people, createPerson } = usePeople();
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const mapOptions = () =>
    people?.map((person) => ({
      value: person.id,
      label: person.name,
    }));

  const selectPerson = async (selectedOption: any) => {
    if (!(allowNewPerson && selectedOption.__isNew__)) {
      onChange(selectedOption.value as string);
      if (clearAfterSelection) setSelectedOption(null);
      return;
    }
    const personId = await createPerson(selectedOption.label);
    if (!personId) return;
    onChange(personId);
    if (clearAfterSelection) setSelectedOption(null);
  };

  return (
    <div>
      {!allowNewPerson ? (
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
