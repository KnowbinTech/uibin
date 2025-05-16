<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { SwitchProps } from './types.js';

  type $$Props = SwitchProps;

  // Default props
  export let label: $$Props['label'] = undefined;
  export let helperText: $$Props['helperText'] = undefined;
  export let errorMessage: $$Props['errorMessage'] = undefined;
  export let size: $$Props['size'] = 'md';
  export let disabled: $$Props['disabled'] = false;
  export let required: $$Props['required'] = false;
  export let value: $$Props['value'] = '';
  export let checked: $$Props['checked'] = false;
  export let id: $$Props['id'] = `switch-${Math.random().toString(36).substring(2, 9)}`;
  export let name: $$Props['name'] = '';
  export let color: $$Props['color'] = 'primary';
  export let labelPosition: $$Props['labelPosition'] = 'right';

  // Custom class
  let className = '';
  export { className as class };

  // Event dispatcher
  const dispatch = createEventDispatcher();

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    checked = target.checked;
    dispatch('change', { checked });
  }

  function handleFocus(event: FocusEvent) {
    dispatch('focus', event);
  }

  function handleBlur(event: FocusEvent) {
    dispatch('blur', event);
  }

  // Generate switch track size classes
  $: trackSizeClasses = {
    sm: 'h-4 w-7',
    md: 'h-5 w-9',
    lg: 'h-6 w-11'
  };

  // Generate switch thumb size classes
  $: thumbSizeClasses = {
    sm: 'h-3 w-3',
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

  // Generate spacing classes
  $: spacingClasses = {
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-2.5'
  };

  // Determine if there's an error
  $: hasError = !!errorMessage;

  // Generate color classes for track when checked
  $: colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  };

  // Generate border radius based on size
  $: borderRadiusClasses = {
    sm: 'rounded-full',
    md: 'rounded-full',
    lg: 'rounded-full'
  };

  // Generate transition classes for the thumb
  $: thumbTranslateClasses = {
    sm: 'translate-x-3',
    md: 'translate-x-4',
    lg: 'translate-x-5'
  };
</script>

<div class="flex flex-col">
  <div class={`flex items-center ${labelPosition === 'left' ? 'flex-row-reverse justify-end' : ''} ${spacingClasses[size || 'md']}`}>
    <div class="relative inline-flex items-center">
      <!-- Hidden actual checkbox -->
      <input
        type="checkbox"
        {id}
        {name}
        {value}
        bind:checked
        {disabled}
        {required}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        class="peer sr-only"
        on:change={handleChange}
        on:focus={handleFocus}
        on:blur={handleBlur}
        {...$$restProps}
      />
      
      <!-- Custom switch track -->
      <div 
        class={`
          ${trackSizeClasses[size || 'md']} 
          ${borderRadiusClasses[size || 'md']} 
          bg-muted
          relative
          transition-colors duration-200
          peer-focus:ring-2 
          peer-focus:ring-offset-2 
          peer-focus:ring-primary/50
          peer-disabled:opacity-50
          peer-disabled:cursor-not-allowed
          ${className}
          ${checked ? colorClasses[color || 'primary'] : ''}
        `}
      >
        <!-- Switch thumb/handle -->
        <div 
          class={`
            ${thumbSizeClasses[size || 'md']} 
            ${borderRadiusClasses[size || 'md']} 
            bg-background
            shadow-sm
            transform transition-transform duration-200 ease-in-out
            absolute top-[2px] left-[2px]
            ${checked ? thumbTranslateClasses[size || 'md'] : ''}
          `}
        ></div>
      </div>
    </div>
    
    {#if label}
      <label 
        for={id}
        class={`${labelSizeClasses[size || 'md']} font-medium ${hasError ? 'text-red-500' : 'text-foreground'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {label}{required ? ' *' : ''}
      </label>
    {/if}
  </div>
  
  {#if hasError}
    <p id={`${id}-error`} class={`${helperSizeClasses[size || 'md']} text-red-500 ${labelPosition === 'left' ? 'text-right' : ''}`}>
      {errorMessage}
    </p>
  {:else if helperText}
    <p id={`${id}-helper`} class={`${helperSizeClasses[size || 'md']} text-muted-foreground ${labelPosition === 'left' ? 'text-right' : ''}`}>
      {helperText}
    </p>
  {/if}
</div> 