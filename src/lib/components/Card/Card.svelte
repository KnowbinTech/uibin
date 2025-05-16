<script lang="ts">
  import type { CardProps } from './types.js';

  type $$Props = CardProps;

  export let hover: $$Props['hover'] = false;
  export let bordered: $$Props['bordered'] = true;
  export let padding: $$Props['padding'] = '4';

  let className = '';
  export { className as class };

  // Generate combined classes
  $: cardClasses = [
    // Base styles
    'rounded-md bg-card text-card-foreground',
    
    // Borderless card has a shadow instead
    bordered ? 'border border-border' : 'shadow-sm',
    
    // Hover effect
    hover && 'transition-shadow hover:shadow-md',
    
    // Padding (unless explicitly set to 'none')
    padding !== 'none' ? `p-${padding}` : '',
    
    // Custom classes
    className
  ].filter(Boolean).join(' ');
</script>

<div class={cardClasses} {...$$restProps}>
  <slot></slot>
</div> 