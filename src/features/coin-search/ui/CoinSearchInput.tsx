import { SearchInput } from '@/shared/ui/search-input';

interface CoinSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function CoinSearchInput({ value, onChange }: CoinSearchInputProps) {
  return (
    <SearchInput value={value} onChange={onChange} placeholder="Search by coin name or symbol..." />
  );
}
