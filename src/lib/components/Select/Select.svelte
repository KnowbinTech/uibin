<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { SelectProps, SelectOption } from './types.js';

  type $$Props = SelectProps;

  // Default props
  export let label: $$Props['label'] = undefined;
  export let helperText: $$Props['helperText'] = undefined;
  export let errorMessage: $$Props['errorMessage'] = undefined;
  export let variant: $$Props['variant'] = 'default';
  export let size: $$Props['size'] = 'md';
  export let disabled: $$Props['disabled'] = false;
  export let required: $$Props['required'] = false;
  export let fullWidth: $$Props['fullWidth'] = false;
  export let leftIcon: $$Props['leftIcon'] = undefined;
  export let id: $$Props['id'] = `select-${Math.random().toString(36).substring(2, 9)}`;
  export let name: $$Props['name'] = '';
  export let placeholder: $$Props['placeholder'] = undefined;
  export let value: $$Props['value'] = '';
  export let multiple: $$Props['multiple'] = false;
  export let options: $$Props['options'] = [];

  // Custom class
  let className = '';
  export { className as class };
  
  // Reference to the select element
  let selectElement: HTMLSelectElement;

  // Event dispatcher
  const dispatch = createEventDispatcher();

  function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    value = target.value;
    dispatch('change', { value });
  }

  function handleFocus(event: FocusEvent) {
    dispatch('focus', event);
  }

  function handleBlur(event: FocusEvent) {
    dispatch('blur', event);
  }

  // Group options by their group property
  $: groupedOptions = options ? options.reduce((acc, option) => {
    const group = option.group || '';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(option);
    return acc;
  }, {} as Record<string, SelectOption[]>) : {};

  // Get array of unique groups
  $: groups = Object.keys(groupedOptions).filter(group => group !== '');

  // Get ungrouped options
  $: ungroupedOptions = groupedOptions[''] || [];

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

  // Generate combined select classes
  $: selectClasses = [
    // Base styles
    'w-full inline-flex items-center justify-between rounded-md border transition-colors appearance-none',
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
  
  // Update the select element value when value prop changes
  $: if (selectElement && value !== undefined) {
    selectElement.value = value;
  }
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
    
    <div class="relative">
      <select 
        {id}
        bind:this={selectElement}
        class={selectClasses}
        {name}
        value={value}
        {disabled}
        {required}
        multiple={multiple}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        onchange={handleChange}
        onfocus={handleFocus}
        onblur={handleBlur}
        {...$$restProps}
      >
        {#if placeholder && !multiple}
          <option value="" disabled selected={!value}>{placeholder}</option>
        {/if}
        
        {#if ungroupedOptions.length > 0}
          {#each ungroupedOptions as option}
            <option 
              value={option.value} 
              disabled={option.disabled}
              selected={value === option.value}
            >
              {option.label}
            </option>
          {/each}
        {/if}
        
        {#each groups as group}
          <optgroup label={group}>
            {#each groupedOptions[group] as option}
              <option 
                value={option.value} 
                disabled={option.disabled}
                selected={value === option.value}
              >
                {option.label}
              </option>
            {/each}
          </optgroup>
        {/each}
      </select>
      
      <!-- Custom arrow icon -->
      {#if !multiple}
        <div class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="h-4 w-4"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      {/if}
    </div>
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