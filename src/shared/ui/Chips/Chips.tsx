import { ChipOption, ChipSelectionMode, PropsWithClassName } from '@/shared/types';
import styles from './Chips.module.css';

interface ChipsProps {
  options: ChipOption[];
  value: any;
  onChange: (value: any) => void;
  mode?: ChipSelectionMode;
  label?: string;
  requireAtLeastOne?: boolean;
};

const Chips: React.FC<PropsWithClassName<ChipsProps>> = ({
  options,
  value,
  onChange,
  mode = ChipSelectionMode.SINGLE,
  label,
  requireAtLeastOne = false,
  className = '',
}) => {
  const isSelected = (optionValue: string): boolean => {
    if (mode === ChipSelectionMode.MULTIPLE) return Array.isArray(value) ? value.includes(optionValue) : false;
    return value === optionValue;
  };

  const handleChipClick = (optionValue: string) => {
    if (mode === ChipSelectionMode.MULTIPLE) {
      const currentValues = Array.isArray(value) ? value : [];
      const isCurrentlySelected = currentValues.includes(optionValue);
      if (requireAtLeastOne && isCurrentlySelected && currentValues.length === 1) return;
      const newValues = isCurrentlySelected ? currentValues.filter(v => v !== optionValue)  : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
    };
  };

  const isChipDisabled = (optionValue: string): boolean => {
    if (mode !== ChipSelectionMode.MULTIPLE || !requireAtLeastOne) return false;
    const currentValues = Array.isArray(value) ? value : [];
    const isCurrentlySelected = currentValues.includes(optionValue);
    return isCurrentlySelected && currentValues.length === 1;
  };

  return (
    <div className={`${styles.chipGroup} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.chipContainer}>
        {options.map((option) => {
          const selected = isSelected(option.value);
          const disabled = isChipDisabled(option.value);
          
          return (
            <button
              key={option.value}
              className={`${styles.chip} ${selected ? styles.active : ''} ${disabled ? styles.disabled : ''}`}
              onClick={() => handleChipClick(option.value)}
              type="button"
              disabled={disabled}
              title={disabled ? "At least one chip must be selected" : undefined}
            >
              {option.color && <span className={styles.colorDot} style={{ backgroundColor: option.color }} />}
              <span className={styles.labelText}>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Chips;
