import { useState } from 'react';

type EditableNameProps = {
  name: string;
  saveName: (newName: string) => void;
};
const EditableName = ({ name, saveName }: EditableNameProps) => {
  const [value, setValue] = useState(name);

  return (
    <div className="relative">
      <pre className="opacity-0 font-sans">{value}</pre>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => saveName(value)}
        className="absolute inset-0 border-0 rounded-none p-0 bg-transparent outline-none appearance-none font-semibold"
      />
    </div>
  );
};

export default EditableName;
