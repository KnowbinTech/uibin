<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { RadioGroupProps, RadioSize } from './types.js';
  import { setContext } from 'svelte';

  type $$Props = RadioGroupProps;

  // Default props
  export let label: $$Props['label'] = undefined;
  export let helperText: $$Props['helperText'] = undefined;
  export let errorMessage: $$Props['errorMessage'] = undefined;
  export let size: $$Props['size'] = 'md';
  export let disabled: $$Props['disabled'] = false;
  export let required: $$Props['required'] = false;
  export let name: $$Props['name'];
  export let value: $$Props['value'] = undefined;
  export let orientation: $$Props['orientation'] = 'vertical';
  export let id: $$Props['id'] = `radio-group-${Math.random().toString(36).substring(2, 9)}`;

  // Custom class
  let className = '';
  export { className as class };

  // Event dispatcher
  const dispatch = createEventDispatcher();

  // Provide context to radio items
  setContext('radioGroup', {
    name,
    groupValue: value,
    size,
    disabled,
    required,
    handleSelect: (newValue: string) => {
      value = newValue;
      dispatch('change', { value });
    }
  });

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

  // Generate spacing classes based on orientation
  $: spacingClass = orientation === 'vertical' ? 'space-y-2' : 'space-x-4 flex items-center';

  // Update context when values change
  $: setContext('radioGroup', {
    name,
    groupValue: value,
    size,
    disabled,
    required,
    handleSelect: (newValue: string) => {
      value = newValue;
      dispatch('change', { value });
    }
  });
  
  // Create a group ID for associating the label with the group
  const groupId = `radio-group-${id}`;
</script>

<div class="flex flex-col">
  {#if label}
    <div class="mb-2">
      <label 
        for={groupId}
        id={`${id}-label`}
        class={`font-medium ${labelSizeClasses[size || 'md']} ${disabled ? 'opacity-50' : ''} ${hasError ? 'text-red-500' : 'text-foreground'}`}
      >
        {label}{required ? ' *' : ''}
      </label>
    </div>
  {/if}
  
  <div 
    id={groupId}
    class={`${spacingClass} ${className}`}
    role="radiogroup"
    aria-labelledby={label ? `${id}-label` : undefined}
    aria-required={required}
    aria-invalid={hasError}
    aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
  >
    <slot></slot>
  </div>
  
  {#if hasError}
    <p id={`${id}-error`} class={`${helperSizeClasses[size || 'md']} text-red-500 mt-1`}>
      {errorMessage}
    </p>
  {:else if helperText}
    <p id={`${id}-helper`} class={`${helperSizeClasses[size || 'md']} text-muted-foreground mt-1`}>
      {helperText}
    </p>
  {/if}
</div> 