import { Search } from 'lucide-react';

import { Input } from '@/shared/ui/input';

interface CoinSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function CoinSearchInput({ value, onChange }: CoinSearchInputProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by coin name or symbol..."
        className="pl-9"
      />
    </div>
  );
}
