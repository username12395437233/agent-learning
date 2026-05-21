import { Search } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  className = 'w-full max-w-md',
}: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="pl-9"
      />
    </div>
  );
}
