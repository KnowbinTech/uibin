<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { CheckboxProps } from './types.js';

  type $$Props = CheckboxProps;

  // Default props
  export let label: $$Props['label'] = undefined;
  export let helperText: $$Props['helperText'] = undefined;
  export let errorMessage: $$Props['errorMessage'] = undefined;
  export let size: $$Props['size'] = 'md';
  export let disabled: $$Props['disabled'] = false;
  export let required: $$Props['required'] = false;
  export let indeterminate: $$Props['indeterminate'] = false;
  export let value: $$Props['value'] = '';
  export let checked: $$Props['checked'] = false;
  export let id: $$Props['id'] = `checkbox-${Math.random().toString(36).substring(2, 9)}`;
  export let name: $$Props['name'] = '';

  // Custom class
  let className = '';
  export { className as class };

  // Event dispatcher
  const dispatch = createEventDispatcher();

  // Reference to the checkbox input element
  let inputElement: HTMLInputElement;

  // Set indeterminate state on input element when the prop changes
  $: if (inputElement && indeterminate !== undefined) {
    inputElement.indeterminate = indeterminate;
  }

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    checked = target.checked;
    dispatch('change', { checked });
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

  // Generate combined checkbox classes
  $: checkboxClasses = [
    // Base styles
    'border rounded border-border bg-background text-primary',
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
        type="checkbox"
        bind:this={inputElement}
        {id}
        {name}
        {value}
        bind:checked
        {disabled}
        {required}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        class={checkboxClasses}
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