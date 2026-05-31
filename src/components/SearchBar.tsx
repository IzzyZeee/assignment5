import type { ChangeEvent, FormEvent } from 'react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmitSearch?: () => void;
};

export const SearchBar = ({ value, onChange, onSubmitSearch }: SearchBarProps) => { // So we can actually get the value from SearchBar
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitSearch?.();
    console.log("hello");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
          }}
          placeholder="Search movies, TV, actors..."
          className="w-full p-3 rounded-xl bg-zinc-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </form>
    </div>
  );
};
