<script lang="ts">
  import { getContext } from 'svelte';
  import type { RadioProps } from './types.js';

  type $$Props = RadioProps;

  // Default props
  export let label: $$Props['label'] = undefined;
  export let helperText: $$Props['helperText'] = undefined;
  export let errorMessage: $$Props['errorMessage'] = undefined;
  export let value: $$Props['value'] = '';
  export let id: $$Props['id'] = `radio-item-${Math.random().toString(36).substring(2, 9)}`;

  // Custom class
  let className = '';
  export { className as class };

  // Get context from RadioGroup
  const radioGroup = getContext<{
    name: string;
    groupValue?: string;
    size: 'sm' | 'md' | 'lg';
    disabled: boolean;
    required: boolean;
    handleSelect: (value: string) => void;
  }>('radioGroup');

  // Destructure context values
  const { name, groupValue, size, disabled, required, handleSelect } = radioGroup;

  // Determine if this radio is checked
  $: checked = groupValue === value;

  // Handle click event
  function handleChange() {
    if (!disabled && value) {
      handleSelect(value);
    }
  }

  // Generate size classes
  $: sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  // Generate label size classes
  $: labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  // Generate helper/error size classes
  $: helperSizeClasses = {
    sm: 'text-xs mt-0.5',
    md: 'text-xs mt-1',
    lg: 'text-sm mt-1.5'
  };

  // Determine if there's an error
  $: hasError = !!errorMessage;

  // Generate combined radio classes
  $: radioClasses = [
    // Base styles
    'border rounded-full border-border text-primary',
    'focus:outline-none focus:ring-1 focus:ring-primary',
    'transition-colors duration-200',
    
    // Size
    size ? sizeClasses[size] : sizeClasses.md,
    
    // Error state
    hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed bg-muted',
    
    // Custom classes
    className
  ].filter(Boolean).join(' ');
</script>

<div class="flex flex-col">
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        type="radio"
        {id}
        {name}
        {value}
        {checked}
        {disabled}
        {required}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        class={radioClasses}
        on:change={handleChange}
        on:focus
        on:blur
        {...$$restProps}
      />
    </div>
    
    {#if label}
      <div class="ml-2">
        <label 
          for={id}
          class={`font-medium ${labelSizeClasses[size || 'md']} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${hasError ? 'text-red-500' : 'text-foreground'}`}
        >
          {label}{required ? ' *' : ''}
        </label>
      </div>
    {/if}
  </div>
  
  {#if hasError}
    <p id={`${id}-error`} class={`${helperSizeClasses[size || 'md']} text-red-500 ml-6`}>
      {errorMessage}
    </p>
  {:else if helperText}
    <p id={`${id}-helper`} class={`${helperSizeClasses[size || 'md']} text-muted-foreground ml-6`}>
      {helperText}
    </p>
  {/if}
</div> 