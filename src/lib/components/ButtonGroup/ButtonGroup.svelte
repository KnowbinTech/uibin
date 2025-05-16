<script lang="ts">
  import type { ButtonGroupProps } from './types.js';

  type $$Props = ButtonGroupProps;

  export let direction: $$Props['direction'] = 'horizontal';
  export let align: $$Props['align'] = 'start';
  export let spacing: $$Props['spacing'] = 'default';
  export let fullWidth: $$Props['fullWidth'] = false;

  let className = '';
  export { className as class };

  // Generate alignment classes
  $: alignClasses = {
    start: direction === 'horizontal' ? 'justify-start' : 'items-start',
    center: direction === 'horizontal' ? 'justify-center' : 'items-center',
    end: direction === 'horizontal' ? 'justify-end' : 'items-end',
    stretch: direction === 'horizontal' ? 'justify-stretch' : 'items-stretch'
  };

  // Generate spacing classes
  $: spacingClasses = {
    none: 'gap-0',
    compact: 'gap-1',
    default: 'gap-2',
    loose: 'gap-4'
  };

  // Generate combined classes
  $: groupClasses = [
    // Base styles
    'flex',
    
    // Direction
    direction === 'horizontal' ? 'flex-row' : 'flex-col',
    
    // Alignment
    align ? alignClasses[align] : alignClasses.start,
    
    // Spacing
    spacing ? spacingClasses[spacing] : spacingClasses.default,
    
    // Full width
    fullWidth && 'w-full',
    
    // Custom classes
    className
  ].filter(Boolean).join(' ');
</script>

<div class={groupClasses} role="group" {...$$restProps}>
  <slot></slot>
</div> 