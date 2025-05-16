<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { TextFieldProps } from './types.js';
  import { getContext } from 'svelte';

  type $$Props = TextFieldProps;

  // Default props
  export let label: $$Props['label'] = undefined;
  export let helperText: $$Props['helperText'] = undefined;
  export let errorMessage: $$Props['errorMessage'] = undefined;
  export let variant: $$Props['variant'] = 'default';
  export let size: $$Props['size'] = 'md';
  export let disabled: $$Props['disabled'] = false;
  export let required: $$Props['required'] = false;
  export let loading: $$Props['loading'] = false;
  export let fullWidth: $$Props['fullWidth'] = false;
  export let leftIcon: $$Props['leftIcon'] = undefined;
  export let rightIcon: $$Props['rightIcon'] = undefined;
  export let id: $$Props['id'] = `textfield-${Math.random().toString(36).substring(2, 9)}`;
  export let readonly: $$Props['readonly'] = false;
  export let clearable: $$Props['clearable'] = false;
  
  // Standard input props
  export let value: $$Props['value'] = '';
  export let name: $$Props['name'] = '';
  export let placeholder: $$Props['placeholder'] = '';
  export let type: $$Props['type'] = 'text';

  // Custom class
  let className = '';
  export { className as class };

  // Event dispatcher
  const dispatch = createEventDispatcher();

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    dispatch('input', { value });
  }
  
  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    dispatch('change', { value });
  }
  
  function clearInput() {
    value = '';
    dispatch('clear');
    dispatch('input', { value });
    dispatch('change', { value });
  }

  // Generate variant classes
  $: variantClasses = {
    default: 'bg-background border-border focus:border-primary',
    filled: 'bg-muted border-transparent focus:border-primary',
    outline: 'bg-transparent border-border focus:border-primary',
    flushed: 'bg-transparent border-x-0 border-t-0 border-b-border rounded-none px-0 focus:border-b-primary'
  };

  // Generate size classes
  $: sizeClasses = {
    sm: 'h-8 text-xs px-3',
    md: 'h-10 text-sm px-4',
    lg: 'h-12 text-base px-4'
  };

  // Determine if there's an error
  $: hasError = !!errorMessage;

  // Generate combined input classes
  $: inputClasses = [
    // Base styles
    'w-full inline-flex items-center justify-start rounded-md border transition-colors',
    'focus:outline-none focus:ring-1 focus:ring-ring',
    
    // Variant
    variant ? variantClasses[variant] : variantClasses.default,
    
    // Size
    size ? sizeClasses[size] : sizeClasses.md,
    
    // Error state
    hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed bg-muted',
    
    // Left icon padding
    leftIcon && 'pl-9',
    
    // Right icon padding
    (rightIcon || clearable) && 'pr-9',
    
    // Full width
    fullWidth && 'w-full',
    
    // Custom classes
    className
  ].filter(Boolean).join(' ');

  // Generate label size classes
  $: labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  // Generate helper/error size classes
  $: helperSizeClasses = {
    sm: 'text-xs mt-1',
    md: 'text-xs mt-1.5',
    lg: 'text-sm mt-2'
  };
</script>

<div class={`flex flex-col w-full ${fullWidth ? 'w-full' : ''}`}>
  {#if label}
    <label 
      for={id}
      class={`block mb-1.5 font-medium ${labelSizeClasses[size || 'md']} ${disabled ? 'opacity-50' : ''} ${hasError ? 'text-red-500' : 'text-foreground'}`}
    >
      {label}{required ? ' *' : ''}
    </label>
  {/if}
  
  <div class="relative w-full">
    {#if leftIcon}
      <div class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <svelte:component this={leftIcon} class="h-4 w-4"></svelte:component>
      </div>
    {/if}
    
    <input 
      {id}
      class={inputClasses}
      {type}
      {name}
      bind:value
      {placeholder}
      {disabled}
      {readonly}
      {required}
      aria-invalid={hasError}
      aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
      on:input={handleInput}
      on:change={handleChange}
      on:focus
      on:blur
      on:keydown
      on:keyup
      {...$$restProps}
    />
    
    {#if loading}
      <div class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
      </div>
    {:else if clearable && value}
      <button 
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        on:click={clearInput}
        aria-label="Clear input"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
    {:else if rightIcon}
      <div class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <svelte:component this={rightIcon} class="h-4 w-4"></svelte:component>
      </div>
    {/if}
  </div>
  
  {#if hasError}
    <p id={`${id}-error`} class={`${helperSizeClasses[size || 'md']} text-red-500`}>
      {errorMessage}
    </p>
  {:else if helperText}
    <p id={`${id}-helper`} class={`${helperSizeClasses[size || 'md']} text-muted-foreground`}>
      {helperText}
    </p>
  {/if}
</div> 