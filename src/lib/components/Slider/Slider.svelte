<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import type { SliderProps, SliderMark } from './types.js';

  type $$Props = SliderProps;

  // Default props
  export let label: $$Props['label'] = undefined;
  export let helperText: $$Props['helperText'] = undefined;
  export let errorMessage: $$Props['errorMessage'] = undefined;
  export let size: $$Props['size'] = 'md';
  export let disabled: $$Props['disabled'] = false;
  export let id: $$Props['id'] = `slider-${Math.random().toString(36).substring(2, 9)}`;
  export let name: $$Props['name'] = '';
  export let value: number = 0;
  export let min: number = 0;
  export let max: number = 100;
  export let step: number = 1;
  export let fullWidth: $$Props['fullWidth'] = false;
  export let marks: SliderMark[] = [];
  export let showValue: $$Props['showValue'] = false;
  export let showTooltip: $$Props['showTooltip'] = false;
  export let valueFormatter: ((value: number) => string) = (val: number) => val.toString();
  export let range: boolean = false;
  export let endValue: number = max;
  export let color: $$Props['color'] = 'primary';

  // Custom class
  let className = '';
  export { className as class };

  // References
  let trackElement: HTMLDivElement;
  let startHandleElement: HTMLDivElement;
  let endHandleElement: HTMLDivElement;
  let startTooltipElement: HTMLDivElement;
  let endTooltipElement: HTMLDivElement;

  // State
  let isDragging = false;
  let activeDragHandle: 'start' | 'end' | null = null;
  let showStartTooltip = false;
  let showEndTooltip = false;
  let trackRect: DOMRect | null = null;

  // Event dispatcher
  const dispatch = createEventDispatcher();

  function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  // Update values when they change, ensuring they stay within bounds
  // Break the cyclic dependency by using separate update functions
  function updateValue(currentValue: number): number {
    const maxVal = range ? Math.min(endValue, max) : max;
    return clamp(currentValue, min, maxVal);
  }
  
  function updateEndValue(currentEndValue: number): number {
    const minVal = range ? Math.max(value, min) : min;
    return clamp(currentEndValue, minVal, max);
  }
  
  $: value = updateValue(value);
  $: endValue = updateEndValue(endValue);

  function calculatePercentage(value: number): number {
    return ((value - min) / (max - min)) * 100;
  }

  $: startPosition = calculatePercentage(value);
  $: endPosition = calculatePercentage(endValue);

  function getValueFromPosition(positionX: number): number {
    if (!trackRect) return min;
    
    const percentage = Math.max(0, Math.min(1, (positionX - trackRect.left) / trackRect.width));
    const rawValue = min + percentage * (max - min);
    
    // Round to nearest step
    return Math.round(rawValue / step) * step;
  }

  function updateTrackRect() {
    if (trackElement) {
      trackRect = trackElement.getBoundingClientRect();
    }
  }

  function handleMouseDown(event: MouseEvent, handle: 'start' | 'end') {
    if (disabled) return;
    
    event.preventDefault();
    isDragging = true;
    activeDragHandle = handle;
    updateTrackRect();
    
    if (handle === 'start') {
      showStartTooltip = showTooltip;
    } else {
      showEndTooltip = showTooltip;
    }
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Dispatch focus event
    dispatch('focus', { handle });
  }
  
  function handleTouchStart(event: TouchEvent, handle: 'start' | 'end') {
    if (disabled) return;
    
    isDragging = true;
    activeDragHandle = handle;
    updateTrackRect();
    
    if (handle === 'start') {
      showStartTooltip = showTooltip;
    } else {
      showEndTooltip = showTooltip;
    }
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    // Dispatch focus event
    dispatch('focus', { handle });
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isDragging || !activeDragHandle) return;
    
    const newValue = getValueFromPosition(event.clientX);
    
    if (activeDragHandle === 'start') {
      value = newValue;
      dispatch('input', { value, endValue: range ? endValue : undefined });
    } else if (activeDragHandle === 'end' && range) {
      endValue = newValue;
      dispatch('input', { value, endValue });
    }
  }
  
  function handleTouchMove(event: TouchEvent) {
    if (!isDragging || !activeDragHandle || !event.touches[0]) return;
    
    event.preventDefault();
    const newValue = getValueFromPosition(event.touches[0].clientX);
    
    if (activeDragHandle === 'start') {
      value = newValue;
      dispatch('input', { value, endValue: range ? endValue : undefined });
    } else if (activeDragHandle === 'end' && range) {
      endValue = newValue;
      dispatch('input', { value, endValue });
    }
  }

  function handleMouseUp() {
    if (!isDragging) return;
    
    isDragging = false;
    showStartTooltip = false;
    showEndTooltip = false;
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    // Dispatch change event
    dispatch('change', { 
      value, 
      endValue: range ? endValue : undefined
    });
    
    // Dispatch blur event
    dispatch('blur', { handle: activeDragHandle });
    activeDragHandle = null;
  }
  
  function handleTouchEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    showStartTooltip = false;
    showEndTooltip = false;
    
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    
    // Dispatch change event
    dispatch('change', { 
      value, 
      endValue: range ? endValue : undefined 
    });
    
    // Dispatch blur event
    dispatch('blur', { handle: activeDragHandle });
    activeDragHandle = null;
  }

  function handleKeyDown(event: KeyboardEvent, handle: 'start' | 'end') {
    if (disabled) return;
    
    const stepValue = event.shiftKey ? step * 10 : step;
    let newValue: number;
    
    if (handle === 'start') {
      newValue = value;
    } else {
      newValue = endValue;
    }
    
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, newValue - stepValue);
        event.preventDefault();
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(handle === 'start' ? (range ? endValue : max) : max, newValue + stepValue);
        event.preventDefault();
        break;
      case 'Home':
        newValue = min;
        event.preventDefault();
        break;
      case 'End':
        newValue = handle === 'start' ? (range ? endValue : max) : max;
        event.preventDefault();
        break;
      default:
        return;
    }
    
    if (handle === 'start') {
      value = newValue;
      dispatch('input', { value, endValue: range ? endValue : undefined });
      dispatch('change', { value, endValue: range ? endValue : undefined });
    } else if (range) {
      endValue = newValue;
      dispatch('input', { value, endValue });
      dispatch('change', { value, endValue });
    }
  }

  function handleTrackClick(event: MouseEvent) {
    if (disabled) return;
    
    updateTrackRect();
    const newValue = getValueFromPosition(event.clientX);
    
    if (!range) {
      value = newValue;
      dispatch('input', { value });
      dispatch('change', { value });
    } else {
      // In range mode, determine which handle to move based on proximity
      const distanceToStart = Math.abs(newValue - value);
      const distanceToEnd = Math.abs(newValue - endValue);
      
      if (distanceToStart <= distanceToEnd) {
        value = newValue;
        dispatch('input', { value, endValue });
        dispatch('change', { value, endValue });
      } else {
        endValue = newValue;
        dispatch('input', { value, endValue });
        dispatch('change', { value, endValue });
      }
    }
  }

  function handleStartHandleMouseEnter() {
    if (!disabled && showTooltip && !isDragging) {
      showStartTooltip = true;
    }
  }
  
  function handleStartHandleMouseLeave() {
    if (!isDragging) {
      showStartTooltip = false;
    }
  }
  
  function handleEndHandleMouseEnter() {
    if (!disabled && showTooltip && !isDragging && range) {
      showEndTooltip = true;
    }
  }
  
  function handleEndHandleMouseLeave() {
    if (!isDragging) {
      showEndTooltip = false;
    }
  }

  onMount(() => {
    // Ensure values are valid on mount
    value = clamp(value, min, range ? endValue : max);
    endValue = range ? clamp(endValue, value, max) : max;
    
    // Initialize track bounds for calculations
    updateTrackRect();
    
    // Add resize listener to update track bounds
    const resizeObserver = new ResizeObserver(() => {
      updateTrackRect();
    });
    
    if (trackElement) {
      resizeObserver.observe(trackElement);
    }
    
    return () => {
      resizeObserver.disconnect();
      
      // Clean up event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  });

  // Generate size classes
  $: sizeClasses = {
    track: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3'
    },
    handle: {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    },
    markDot: {
      sm: 'h-1 w-1',
      md: 'h-1.5 w-1.5',
      lg: 'h-2 w-2'
    }
  };

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
  
  // Generate tooltip size classes
  $: tooltipSizeClasses = {
    sm: 'text-xs py-0.5 px-1',
    md: 'text-xs py-1 px-1.5',
    lg: 'text-sm py-1 px-2'
  };

  // Determine if there's an error
  $: hasError = !!errorMessage;

  // Generate color classes
  $: colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  };
</script>

<div class={`flex flex-col ${fullWidth ? 'w-full' : 'w-60'} ${className || ''}`}>
  <div class="flex justify-between items-center mb-2">
    {#if label}
      <label 
        for={id}
        class={`block font-medium ${labelSizeClasses[size || 'md']} ${disabled ? 'opacity-50' : ''} ${hasError ? 'text-red-500' : 'text-foreground'}`}
      >
        {label}
      </label>
    {/if}
    
    {#if showValue}
      <div class={`${labelSizeClasses[size || 'md']} text-muted-foreground`}>
        {#if range}
          {valueFormatter(value)} - {valueFormatter(endValue)}
        {:else}
          {valueFormatter(value)}
        {/if}
      </div>
    {/if}
  </div>
  
  <div 
    class="relative py-2"
    role="presentation"
  >
    <!-- Track background -->
    <div 
      bind:this={trackElement}
      class={`w-full ${sizeClasses.track[size || 'md']} bg-muted rounded-full ${disabled ? 'opacity-50' : ''}`}
      onclick={handleTrackClick}
    ></div>
    
    <!-- Track active fill -->
    <div 
      class={`absolute top-1/2 -translate-y-1/2 ${sizeClasses.track[size || 'md']} rounded-full ${colorClasses[color || 'primary']} ${disabled ? 'opacity-50' : ''}`}
      style={`left: ${range ? startPosition : 0}%; width: ${range ? endPosition - startPosition : startPosition}%;`}
    ></div>
    
    <!-- Marks -->
    {#if marks && marks.length > 0}
      {#each marks as mark}
        {#if mark.value >= min && mark.value <= max}
          {@const markPosition = calculatePercentage(mark.value)}
          <div 
            class="absolute top-1/2 -translate-x-1/2"
            style={`left: ${markPosition}%;`}
          >
            <div 
              class={`${sizeClasses.markDot[size || 'md']} rounded-full bg-background border border-muted-foreground ${disabled ? 'opacity-50' : ''}`}
            ></div>
            
            {#if mark.label}
              <div 
                class={`absolute mt-2 -translate-x-1/2 ${labelSizeClasses[size || 'md']} text-muted-foreground text-center whitespace-nowrap ${disabled ? 'opacity-50' : ''}`}
                style="left: 50%;"
              >
                {mark.label}
              </div>
            {/if}
          </div>
        {/if}
      {/each}
    {/if}
    
    <!-- Start handle -->
    <div 
      bind:this={startHandleElement}
      role="slider"
      tabindex={disabled ? -1 : 0}
      aria-valuemin={min}
      aria-valuemax={range ? endValue : max}
      aria-valuenow={value}
      aria-disabled={disabled}
      aria-label={label ? label : 'Slider'}
      id={id}
      class={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClasses.handle[size || 'md']} rounded-full bg-background border-2 ${hasError ? 'border-red-500' : colorClasses[color || 'primary'].replace('bg-', 'border-')} shadow
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/50'}`}
      style={`left: ${startPosition}%;`}
      onmousedown={(event) => handleMouseDown(event, 'start')}
      ontouchstart={(event) => handleTouchStart(event, 'start')}
      onkeydown={(event) => handleKeyDown(event, 'start')}
      onmouseenter={handleStartHandleMouseEnter}
      onmouseleave={handleStartHandleMouseLeave}
    ></div>
    
    <!-- Start tooltip -->
    {#if showTooltip && showStartTooltip}
      <div 
        bind:this={startTooltipElement}
        class={`absolute -translate-x-1/2 -translate-y-full ${tooltipSizeClasses[size || 'md']} bg-foreground text-background rounded shadow-sm whitespace-nowrap mb-1`}
        style={`left: ${startPosition}%; top: 0;`}
      >
        {valueFormatter(value)}
      </div>
    {/if}
    
    <!-- End handle (only for range sliders) -->
    {#if range}
      <div 
        bind:this={endHandleElement}
        role="slider"
        tabindex={disabled ? -1 : 0}
        aria-valuemin={value}
        aria-valuemax={max}
        aria-valuenow={endValue}
        aria-disabled={disabled}
        aria-label={label ? `${label} upper value` : 'Slider upper value'}
        class={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClasses.handle[size || 'md']} rounded-full bg-background border-2 ${hasError ? 'border-red-500' : colorClasses[color || 'primary'].replace('bg-', 'border-')} shadow
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/50'}`}
        style={`left: ${endPosition}%;`}
        onmousedown={(event) => handleMouseDown(event, 'end')}
        ontouchstart={(event) => handleTouchStart(event, 'end')}
        onkeydown={(event) => handleKeyDown(event, 'end')}
        onmouseenter={handleEndHandleMouseEnter}
        onmouseleave={handleEndHandleMouseLeave}
      ></div>
      
      <!-- End tooltip -->
      {#if showTooltip && showEndTooltip}
        <div 
          bind:this={endTooltipElement}
          class={`absolute -translate-x-1/2 -translate-y-full ${tooltipSizeClasses[size || 'md']} bg-foreground text-background rounded shadow-sm whitespace-nowrap mb-1`}
          style={`left: ${endPosition}%; top: 0;`}
        >
          {valueFormatter(endValue)}
        </div>
      {/if}
    {/if}
  </div>
  
  <!-- Hidden inputs for form submission -->
  <input type="hidden" {name} value={value} />
  {#if range && name}
    <input type="hidden" name={`${name}-end`} value={endValue} />
  {/if}
  
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