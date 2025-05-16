<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import type { TextAreaProps } from './types.js';

  type $$Props = TextAreaProps;

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
  export let id: $$Props['id'] = `textarea-${Math.random().toString(36).substring(2, 9)}`;
  export let readonly: $$Props['readonly'] = false;
  export let clearable: $$Props['clearable'] = false;
  
  // Standard textarea props
  export let value: $$Props['value'] = '';
  export let name: $$Props['name'] = '';
  export let placeholder: $$Props['placeholder'] = '';
  export let rows: $$Props['rows'] = 3;
  export let maxRows: $$Props['maxRows'] = Infinity;
  export let autoResize: $$Props['autoResize'] = false;
  export let maxLength: $$Props['maxLength'] = undefined;
  export let showCount: $$Props['showCount'] = false;

  // Custom class
  let className = '';
  export { className as class };

  // Event dispatcher
  const dispatch = createEventDispatcher();

  // References
  let textareaEl: HTMLTextAreaElement;

  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    value = target.value;
    dispatch('input', { value });
    
    if (autoResize) {
      resizeTextarea();
    }
  }
  
  function handleChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    value = target.value;
    dispatch('change', { value });
  }
  
  function clearTextarea() {
    value = '';
    dispatch('clear');
    dispatch('input', { value });
    dispatch('change', { value });
    
    if (autoResize) {
      resizeTextarea();
    }
  }

  function handleFocus(event: FocusEvent) {
    dispatch('focus', event);
  }

  function handleBlur(event: FocusEvent) {
    dispatch('blur', event);
  }

  function handleKeydown(event: KeyboardEvent) {
    dispatch('keydown', event);
  }

  function handleKeyup(event: KeyboardEvent) {
    dispatch('keyup', event);
  }

  function resizeTextarea() {
    if (!textareaEl) return;
    
    // Reset height to auto to get proper scrollHeight
    textareaEl.style.height = 'auto';
    
    // Calculate new height
    const lineHeight = parseInt(getComputedStyle(textareaEl).lineHeight) || 20;
    const paddingTop = parseInt(getComputedStyle(textareaEl).paddingTop) || 0;
    const paddingBottom = parseInt(getComputedStyle(textareaEl).paddingBottom) || 0;
    
    // Calculate max height based on maxRows (safely handle undefined)
    const maxHeightValue = maxRows ?? Infinity;
    const maxHeight = maxHeightValue * lineHeight + paddingTop + paddingBottom;
    
    // Set height to scrollHeight, but cap at maxHeight
    const newHeight = Math.min(textareaEl.scrollHeight, maxHeight);
    textareaEl.style.height = `${newHeight}px`;
  }

  onMount(() => {
    if (autoResize && textareaEl) {
      resizeTextarea();
    }
  });

  // Generate variant classes
  $: variantClasses = {
    default: 'bg-background border-border focus:border-primary',
    filled: 'bg-muted border-transparent focus:border-primary',
    outline: 'bg-transparent border-border focus:border-primary',
    flushed: 'bg-transparent border-x-0 border-t-0 border-b-border rounded-none px-0 focus:border-b-primary'
  };

  // Generate size classes
  $: sizeClasses = {
    sm: 'text-xs px-3 py-2',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-4 py-3'
  };

  // Determine if there's an error
  $: hasError = !!errorMessage;
  
  // Calculate remaining characters
  $: charCount = value?.length || 0;
  $: charRemaining = maxLength ? maxLength - charCount : null;
  $: showCharCount = showCount || (maxLength !== undefined);

  // Generate combined textarea classes
  $: textareaClasses = [
    // Base styles
    'w-full inline-flex rounded-md border transition-colors resize-vertical',
    'focus:outline-none focus:ring-1 focus:ring-ring',
    
    // Variant
    variant ? variantClasses[variant] : variantClasses.default,
    
    // Size
    size ? sizeClasses[size] : sizeClasses.md,
    
    // Error state
    hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed bg-muted',
    
    // Full width
    fullWidth && 'w-full',
    
    // Auto resize
    autoResize && 'resize-none',
    
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

  // Update resize when value changes
  $: if (autoResize && textareaEl && value) {
    // We need to use setTimeout to ensure the value is updated in the DOM
    setTimeout(resizeTextarea, 0);
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
    <textarea 
      bind:this={textareaEl}
      {id}
      class={textareaClasses}
      {name}
      bind:value
      {placeholder}
      {rows}
      maxlength={maxLength}
      {disabled}
      {readonly}
      {required}
      aria-invalid={hasError}
      aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
      oninput={handleInput}
      onchange={handleChange}
      onfocus={handleFocus}
      onblur={handleBlur}
      onkeydown={handleKeydown}
      onkeyup={handleKeyup}
      {...$$restProps}
    ></textarea>
    
    {#if loading}
      <div class="absolute right-3 top-3 text-muted-foreground">
        <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
      </div>
    {:else if clearable && value}
      <button 
        type="button"
        class="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
        onclick={clearTextarea}
        aria-label="Clear textarea"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
    {/if}
  </div>
  
  <div class="flex justify-between items-center">
    <div>
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
    
    {#if showCharCount}
      <div class={`${helperSizeClasses[size || 'md']} text-muted-foreground ml-auto ${charRemaining !== null && charRemaining < 10 ? 'text-red-500' : ''}`}>
        {#if charRemaining !== null}
          {charRemaining} remaining
        {:else}
          {charCount} characters
        {/if}
      </div>
    {/if}
  </div>
</div> 